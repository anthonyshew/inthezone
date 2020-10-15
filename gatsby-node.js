const fs = require('fs-extra')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onPreInit = () => {
  //Copy everything from content assets into public folder.
  fs.copySync(path.join(__dirname, `/content/assets`), path.join(__dirname, `/public/cms`))
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const customPage = path.resolve(`./src/templates/custom-page.js`)
  const teamPage = path.resolve(`./src/templates/team-page.js`)
  const result = await graphql(
    `
      {
        blogPosts: allFile(filter: {sourceInstanceName: {eq: "blog"}, childMarkdownRemark: {frontmatter: {title: {ne: "DEVELOPMENT"}}}}) {
          edges {
            node {
              childMarkdownRemark {
                fields {
                  slug
                }
                frontmatter {
                  description
                  title
                  coverImage
                  date
                }
              }
            }
          }
        }
        customPages: allFile(filter: {sourceInstanceName: {eq: "customPages"}, childMarkdownRemark: {frontmatter: {title: {ne: "DEVELOPMENT"}}}}) {
          edges {
            node {
              childMarkdownRemark {
                fields {
                  slug
                }
                frontmatter {
                  title
                  coverImage
                  date
                  shortDescription
                }
              }
            }
          }
        }
        teams: allFile(filter: {sourceInstanceName: {eq: "teams"}, extension: {eq: "json"}}) {
          edges {
            node {
              name
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  const posts = result.data.blogPosts.edges

  // Create blog post index pagination.
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)

  Array.from({ length: numPages }).forEach((_, index) => {
    createPage({
      path: index === 0 ? `/blog` : `/blog/${index + 1}`,
      component: path.resolve("./src/templates/blog-list.js"),
      context: {
        limit: postsPerPage,
        skip: index * postsPerPage,
        numPages,
        currentPage: index + 1,
      },
    })
  })


  // Create blog posts pages.
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    createPage({
      path: `/blog${post.node.childMarkdownRemark.fields.slug}`,
      component: blogPost,
      context: {
        slug: post.node.childMarkdownRemark.fields.slug,
        previous,
        next,
      },
    })
  })

  //Create custom pages.
  const customPages = result.data.customPages.edges

  customPages.forEach((page) => {
    createPage({
      path: `page${page.node.childMarkdownRemark.fields.slug}`,
      component: customPage,
      context: {
        slug: page.node.childMarkdownRemark.fields.slug,
        image: page.node.childMarkdownRemark.frontmatter.coverImage.split("/").pop()
      },
    })
  })

  // Create teams pages.
  const teams = result.data.teams.edges

  teams.forEach((team) => {
    createPage({
      path: `teams/${team.node.name.toLowerCase().replace(" ", "-")}`,
      component: teamPage,
      context: {
        name: team.node.name
      }
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

// Create all graphql fields even if they have no content.
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
  type File implements Node {
    childMarkdownRemark: MarkdownRemark
    childGalleryJson: GalleryJson
    childTeamsJson: TeamsJson
  }

  type MarkdownRemark {
    excerpt: String
    fields: Fields
    frontmatter: Frontmatter
    html: String
  }

  type Fields implements Node {
    slug: String
  }

  type Frontmatter implements Node {
    coverImage: String
    date: Date @dateformat(formatString: "MMMM DD, YYYY")
    description: String
    shortDescription: String
    title: String
  }

  type GalleryJson implements Node {
    datetime: Date
    name: String
    imageList: [Image]
  }

  type Image implements Node {
    image: String
  }

  type TeamsJson implements Node {
    ageGroup: String
    bio: String
    statsBool: Boolean
    coaches: [Coach]
    players: [Player]
    schedule: Schedule
  }

  type Coach implements Node {
    name: String
    title: String
    image: String
    bio: String
  }

  type Player implements Node {
    name: String
    positions: [String]
    hobbies: String
    faveAthlete: String
    jerseyNumber: String
    imgBool: Boolean
    image: String
    pitchingStats: PitchingStats
    hittingStats: HittingStats
  }

  type PitchingStats implements Node {
    hits: Int
    inningsPitched: Float
    battingAverageAgainst: Float
    runs: Int
    walks: Int
    losses: Int
    era: Float
    wins: Int
    strikeouts: Int
    whip: Float
    earnedRuns: Int
  }

  type HittingStats implements Node {
    hits: Int
    games: Int
    doubles: Int
    homeRuns: Int
    walks: Int
    atBats: Int
    triples: Int
    strikeouts: Int
    rbi: Int
    battingAverage: Float
  }

  type Schedule implements Node {
    games: [Game]
    recurringPractices: [RecurringPractice]
    upcomingPractices: [UpcomingPractice]
  }

  type Game implements Node {
    startTime: String
    side: String
    opponent: String
    addressObject: AddressObject
  }

  type RecurringPractice implements Node {
    day: String
    startTime: String
    endTime: String
    addressObject: AddressObject
  }

  type UpcomingPractice implements Node {
    addressObject: AddressObject
    startTime: String
    endTime: String
  }

  type AddressObject implements Node {
    location: String
    streetAddress: String
    city: String
    state: String
    zipCode: String
  }
  `

  createTypes(typeDefs)
}