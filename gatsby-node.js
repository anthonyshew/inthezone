const fs = require('fs-extra')
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const customPage = path.resolve(`./src/templates/custom-page.js`)
  const result = await graphql(
    `
      {
        blogPosts: allFile(filter: {sourceInstanceName: {eq: "blog"}}) {
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
        customPages: allFile(filter: {sourceInstanceName: {eq: "customPages"}}) {
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
      }
    `
  )

  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.
  const posts = result.data.blogPosts.edges
  const customPages = result.data.customPages.edges

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

exports.onPreInit = () => {
  //Copy everything from content assets into public folder.
  fs.copySync(path.join(__dirname, `/content/assets`), path.join(__dirname, `/public/cms`))
}