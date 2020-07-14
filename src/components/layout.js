import React from "react"
import { Link } from "gatsby"
import "../styles/layout.scss"

import { useStaticQuery, graphql } from "gatsby"

const Layout = ({ location, children, cssPageName }) => {
  const { data, colors } = useStaticQuery(graphql`
  query LayoutQuery {
    data: file(sourceInstanceName: {eq: "basics"}) {
      childContentJson {
        teamLogo
      }
    }
    colors: file(sourceInstanceName: {eq: "colors"}) {
      childContentJson {
        primaryColor
        secondaryColor
        textColor
      }
    }
  }
  `)

  const primaryColor = colors.childContentJson.primaryColor
  const secondaryColor = colors.childContentJson.secondaryColor
  const textColor = colors.childContentJson.textColor

  let header, footer

  header = (
    <>
      <nav className="navbar" style={{ backgroundColor: primaryColor }}>
        <Link to="/" style={{ color: textColor }}>Home</Link>
        <Link to="/schedule" style={{ color: textColor }}>Schedule</Link>
        <Link to="/coaches" style={{ color: textColor }}>Coaches</Link>
        <Link to="/players" style={{ color: textColor }}>Players</Link>
        <Link to="/contact" style={{ color: textColor }}>Contact</Link>
        <div className="image-container">
          <svg className="svg-body" viewBox="0 0 129 129" fill="green" xmlns="http://www.w3.org/2000/svg">
            <path className="svg-path" d="M0 64.5V0H129V64.5L64.5 129L0 64.5Z" style={{ fill: primaryColor }} />
          </svg>
          <img className="team-logo" src={data.childContentJson.teamLogo} alt="Team logo." style={{ position: "absolute" }} />
        </div>
      </nav>

      <div className="text-bar" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
        <p>The Official Home of</p>
        <p>The New York Knights</p>
      </div>
    </>
  )

  footer = (
    <>
      <nav className="navbar" style={{ backgroundColor: primaryColor }}>
        <Link to="/" style={{ color: textColor }}>Home</Link>
        <Link to="/schedule" style={{ color: textColor }}>Schedule</Link>
        <Link to="/coaches" style={{ color: textColor }}>Coaches</Link>
        <Link to="/players" style={{ color: textColor }}>Players</Link>
        <Link to="/contact" style={{ color: textColor }}>Contact</Link>
      </nav>
      <div className="image-container">
        <img src={data.childContentJson.teamLogo} alt="Team logo." />
      </div>
      <p style={{ color: secondaryColor }}>This site was created by <a className="attribution-link" style={{ color: secondaryColor }} href="https://inthezone.dev" target="_blank" rel="noopener noreferrer">In the Zone Development</a> using the <a className="attribution-link" style={{ color: secondaryColor }} href="https://inthezone.dev" target="_blank" rel="noopener noreferrer">TeamStage platform</a>.</p>
    </>
  )

  return (
    <>
      <header>{header}</header>
      <main className={`${cssPageName ? `page-${cssPageName}` : ""}`}>{children}</main>
      <footer style={{ backgroundColor: primaryColor }}>{footer}</footer>
    </>
  )
}

export default Layout