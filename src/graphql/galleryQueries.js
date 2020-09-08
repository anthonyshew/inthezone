import { graphql } from "gatsby"

export const allGalleryQuery = graphql`
  fragment AllGalleryImages on Query {
      allGalleryImages: allFile(filter: {sourceInstanceName: {eq: "gallery"}}) {
          edges {
            node {
              id
              childImageSharp {
                fluid {
                  originalName
                }
              }
            }
          }
        }
  }
`

export const galleryItemsArray = graphql`
fragment GalleryItemsArray on Query {
  galleryItemsArray:  allFile(filter: {sourceInstanceName: {eq: "gallery"}}) {
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