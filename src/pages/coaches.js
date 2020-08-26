import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import '../styles/coaches.scss'
import { getOriginalImageName } from "../utils/getOriginalImageName"

import Layout from "../components/layout"

export default ({ location }) => {
  const { coachesData, coachesImages, colors } = useStaticQuery(graphql`
  query CoachesQuery {
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
    coachesImages: allFile(filter: {sourceInstanceName: {eq: "coachesImgs"}}) {
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
    colors: file(sourceInstanceName: {eq: "colors"}) {
      childContentJson {
        secondaryColor
        primaryColor
        textColor
      }
    }
  }
    `)

  const coachesArray = coachesData.childContentJson.coachesArray
  const coachesImageArray = coachesImages.edges
  const { primaryColor, secondaryColor } = colors.childContentJson

  return (
    <Layout location={location} title="Coaches">
      <h1 style={{ color: primaryColor }}>Coaching Staff</h1>
      {coachesArray.map(coach => (
        <div key={coach.name} className="coach">
          <Image className="coach-avatar"
            fluid={coachesImageArray.find(image => image.node.childImageSharp.fluid.originalName === getOriginalImageName(coach.image)).node.childImageSharp.fluid}
            alt={coach.name}
          />
          <h2 style={{ color: secondaryColor }}>{coach.name}</h2>
          <h3 style={{ color: primaryColor }}>{coach.title}</h3>
          {coach.bio.split('\n\n').map(paragraph => <p className="bio-p" style={{ color: primaryColor }}>{paragraph}</p>)}
        </div>
      ))}

    </Layout>
  )
}