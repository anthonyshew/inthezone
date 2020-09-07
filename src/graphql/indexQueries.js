import { graphql } from "gatsby"

export const allHeroImages = graphql`
  fragment AllHeroImages on Query {
      heroImages: allFile(filter: {sourceInstanceName: {eq: "homePageImgs"}}) {
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

export const homePageData = graphql`
  fragment HomePageData on Query {
    homePageData: file(sourceInstanceName: {eq: "homePage"}) {
      childContentJson {
          heroImage
          heroText
          quotation
          quoteAttr
          orgLogo
          orgName
          auxText
      }
    }
  }
`
