import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../styles/coaches.scss'

import Layout from "../components/layout"

export default ({ location }) => {
  const { data, colors } = useStaticQuery(graphql`
  query CoachesQuery {
    data: file(sourceInstanceName: {eq: "coaches"}) {
      childContentJson {
        coachesArray {
          bio
          image
          name
          title
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

  const coachArray = data.childContentJson.coachesArray
  const { primaryColor, secondaryColor } = colors.childContentJson

  return (
    <Layout location={location} cssPageName="coaches">
      <h1 style={{ color: primaryColor }}>Coaching Staff</h1>
      {coachArray.map(coach => (
        <div key={coach.name} className="coach">
          <img className="" src={coach.image} alt={coach.name} />
          <h2 style={{ color: secondaryColor }}>{coach.name}</h2>
          <h3 style={{ color: primaryColor }}>{coach.title}</h3>
          {coach.bio.split('\n\n').map(paragraph => <p className="bio-p" style={{ color: primaryColor }}>{paragraph}</p>)}
        </div>
      ))}

    </Layout>
  )
}