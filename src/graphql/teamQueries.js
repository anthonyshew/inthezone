import { graphql } from "gatsby"

export const coachesData = graphql`
fragment CoachesData on Query {
    coachesData: file(sourceInstanceName: {eq: "coaches"}) {
        childContentJson {
          coachesArray {
            bio
            image
            name
            title
          }
        }
    }
}
`

export const coachesImages = graphql`
fragment TeamImages on Query {
    teamImages: allFile(filter: {sourceInstanceName: {eq: "teamsImgs"}}) {
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

export const teams = graphql`
fragment AllTeamsData on Query {
  teams: allTeamsJson(sort: {fields: ageGroup}) {
    edges {
      node {
        ageGroup
        bio
        coaches {
          bio
          image
          name
          title
        }
        players {
          imgBool
          name
          image
        }
      }
    }
  }
}
`
