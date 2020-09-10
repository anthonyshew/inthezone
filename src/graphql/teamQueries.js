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
  teams: allFile(filter: {sourceInstanceName: {eq: "teams"}, extension: {eq: "json"}}, sort: {fields: childTeamsJson___ageGroup}) {
    edges {
      node {
        childTeamsJson {
          ageGroup
          bio
          coaches {
            bio
            image
            name
            title
          }
          players {
            hittingStats {
              atBats
              battingAverage
              doubles
              games
              hits
              homeRuns
              rbi
              strikeouts
              triples
              walks
            }
            image
            imgBool
            name
            pitchingStats {
              battingAverageAgainst
              earnedRuns
              era
              hits
              inningsPitched
              losses
              runs
              strikeouts
              walks
              whip
              wins
            }
            positions
            hobbies
            jerseyNumber
          }
          schedule {
            games {
              opponent
              side
              startTime
            }
            practices {
              addressObject {
                city
                location
                state
                streetAddress
                zipCode
              }
              day
              endTime
              startTime
            }
          }
          statsBool
        }
      }
    }
  }
}
`
