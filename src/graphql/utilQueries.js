import { graphql } from "gatsby"

export const allBlogPosts = graphql`
fragment AllBlogPosts on Query {
    blogPosts: allFile(filter: {sourceInstanceName: {eq: "blog"}, childMarkdownRemark: {frontmatter: {title: {ne: "DEVELOPMENT"}}}}) {
        edges {
          node {
            childMarkdownRemark {
              fields {
                slug
              }
              frontmatter {
                title
                description
              }
              html
            }
          }
        }
    }
}
`

export const AllOrgLogos = graphql`
fragment AllOrgLogos on Query {
  allOrgLogos: allFile(filter: {sourceInstanceName: {eq: "orgLogos"}}) {
    edges {
      node {
        childImageSharp {
          fluid {
            originalName
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`

export const OrganizationBasics = graphql`
fragment OrganizationBasics on Query {
  orgBasics: file(sourceInstanceName: {eq: "basics"}) {
    childContentJson {
      orgLogo
      orgName
      hometown
    }
  }
}
`

export const allContactInfo = graphql`
fragment ContactInfo on Query {
  contactInfo: file(sourceInstanceName: {eq: "basics"}) {
    childContentJson {
      contactInfo {
        email
        phoneNumber
        address {
          streetAddress
          city
          state
          zipCode
        }
      }
    }
  }
}
`

export const socialMediaLinks = graphql`
fragment SocialMediaLinks on Query {
  socialMediaLinks: file(sourceInstanceName: {eq: "basics"}) {
    childContentJson {
      socials {
        twitter
        instagram
        facebook
        youtube
      }
    }
  }
}
`