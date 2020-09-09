import { graphql } from "gatsby"

export const allGalleryQuery = graphql`
  fragment AllGalleryImages on Query {
      allGalleryImages: allFile(filter: {sourceInstanceName: {eq: "galleryImgs"}}) {
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

export const galleryItemsArray = graphql`
fragment GalleryItemsArray on Query {
  galleryItemsArray:  allFile(filter: {sourceInstanceName: {eq: "gallery"}, childMarkdownRemark: {frontmatter: {title: {ne: "DEVELOPMENT"}}}}) {
    edges {
        node {
            childGalleryJson {
                datetime
                name
                imageList {
                  image
                }
            }
        }
    }
  }
}
`