import { graphql } from "gatsby"

export const colors = graphql`
fragment Colors on Query {
    colors: file(sourceInstanceName: {eq: "colors"}) {
        childContentJson {
          secondaryColor
          primaryColor
          textColor
        }
    }
}
`