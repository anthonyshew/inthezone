import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import '../styles/schedule.scss'

import Layout from "../components/layout"

export default ({ location }) => {
  const { data, colors } = useStaticQuery(graphql`
  query ScheduleQuery{
    data: file(sourceInstanceName: {eq: "schedule"}) {
      childContentJson {
        games {
          startTime
          side
          opponent
          addressObject {
            location
            streetAddress
            city
            state
            zipCode
          }
        }
        practices {
          day
          startTime
          endTime
          addressObject {
            location
            streetAddress
            city
            state
            zipCode
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

  const practices = data.childContentJson.practices
  const games = data.childContentJson.games
  const primaryColor = colors.childContentJson.primaryColor
  const secondaryColor = colors.childContentJson.secondaryColor
  const textColor = colors.childContentJson.textColor

  const formatDate = (dateTimeString) => {
    const options = { weekday: "short", month: "long", day: "numeric", year: "numeric" }
    return new Date(dateTimeString).toLocaleDateString(undefined, options)
  }

  const formatTime = (dateTimeString) => {
    const options = { hour: "2-digit", minute: "2-digit" }
    let time = new Date(dateTimeString).toLocaleTimeString(undefined, options)
    if (time[0] === "0") {
      time = time.substr(1)
    }

    return time
  }

  return (
    <Layout location={location} cssPageName="schedule">
      <div className="column practices-container">
        <h2 style={{ backgroundColor: primaryColor, color: textColor }}>Practices</h2>
        <div className="list practice-list">
          {practices.map(elem => (
            <div key={elem.day} className="practice" style={{ backgroundColor: secondaryColor, color: textColor, border: `5px solid ${primaryColor}` }}>
              <p className="day">{elem.day}</p>
              <p className="times">{elem.startTime} - {elem.endTime}</p>
              <p className="address">{elem.addressObject.location}</p>
              <p className="address">{elem.addressObject.streetAddress}</p>
              <p className="address">{elem.addressObject.city}, {elem.addressObject.state} {elem.addressObject.zipCode}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="column games-container">
        <h2 style={{ backgroundColor: primaryColor, color: textColor }}>Games</h2>
        <div className="list games-list">
          {games.map((elem, index) => (
            <div key={index} className="game" style={{ backgroundColor: secondaryColor, color: textColor, border: `5px solid ${primaryColor}` }}>
              <p>{elem.side === "Away" ? "@" : "vs."} {elem.opponent}</p>
              <p className="times">{formatDate(elem.startTime)}</p>
              <p className="times">{formatTime(elem.startTime)}</p>
              <p className="address">{elem.addressObject.location}</p>
              <p className="address">{elem.addressObject.streetAddress}</p>
              <p className="address">{elem.addressObject.city}, {elem.addressObject.state} {elem.addressObject.zipCode}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}