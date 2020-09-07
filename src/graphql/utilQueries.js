import { graphql } from "gatsby"

export const allBlogPosts = graphql`
fragment AllBlogPosts on Query {
    blogPosts: allFile(filter: {sourceInstanceName: {eq: "blog"}}) {
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
  contactInfo: file(sourceInstanceName: {eq: "contact"}) {
    childSiteOptionsJson {
      email
      phoneNumber
      address {
        city
        state
        streetAddress
        zipCode
      }
    }
  }
}
`

export const socialMediaLinks = graphql`
fragment SocialMediaLinks on Query {
  socialMediaLinks: file(sourceInstanceName: {eq: "socials"}) {
    childSiteOptionsJson {
      instagram
      facebook
      twitter
      youtube
    }
  }
}
`