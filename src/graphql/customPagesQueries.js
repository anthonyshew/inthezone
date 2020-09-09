import { graphql } from "gatsby"


export const allCustomPageImages = graphql`
fragment AllCustomPageImages on Query {
    customPageImgsData: allFile(filter: {sourceInstanceName: {eq: "customPagesImgs"}, childMarkdownRemark: {frontmatter: {title: {ne: "DEVELOPMENT"}}}}) {
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