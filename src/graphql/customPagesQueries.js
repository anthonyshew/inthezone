import { graphql } from "gatsby"


export const allCustomPageImages = graphql`
fragment AllCustomPageImages on Query {
    customPageImgs: allFile(filter: {sourceInstanceName: {eq: "customPageImgs"}, childMarkdownRemark: {frontmatter: {title: {ne: "DEVELOPMENT"}}}}) {
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

export const allCustomPageData = graphql`
    fragment AllCustomPageData on Query {
        customPagesData: allFile(filter: {sourceInstanceName: {eq: "customPages"}, childMarkdownRemark: {frontmatter: {title: {ne: "DEVELOPMENT"}}}}) {
            edges {
              node {
                childMarkdownRemark {
                  fields {
                      slug
                  }
                  frontmatter {
                    coverImage
                    shortDescription
                    title
                  }
                }
              }
            }
        }
    }
`