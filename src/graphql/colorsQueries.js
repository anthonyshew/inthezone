import { graphql } from "gatsby"

export const colors = graphql`
fragment Colors on Query {
  colors: file(sourceInstanceName: {eq: "basics"}) {
    childContentJson {
      colors {
        primaryColor
        secondaryColor
        textColor
      }
    }
  }
}
`