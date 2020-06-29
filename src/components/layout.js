import React from "react"
import { Link } from "gatsby"
import "../styles/layout.scss"

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Layout = ({ location, children, cssPageName }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      file(sourceInstanceName: {eq: "logo"}) {
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  let header, footer

  header = (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/coaches">Coaches</Link>
        <Link to="/players">Players</Link>
        <Link to="/contact">Contact</Link>
        <div className="image-container">
          <svg className="svg-body" viewBox="0 0 129 129" fill="green" xmlns="http://www.w3.org/2000/svg">
            <path className="svg-path" d="M0 64.5V0H129V64.5L64.5 129L0 64.5Z" fill="#C4C4C4" />
          </svg>
          <Image className="team-logo" fluid={data.file.childImageSharp.fluid} alt="Team logo." style={{ position: "absolute" }} />
        </div>
      </nav>

      <div className="text-bar">
        <p>The Official Home of</p>
        <p>The New York Knights</p>
      </div>
    </>
  )

  footer = (
    <>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/schedule">Schedule</Link>
        <Link to="/coaches">Coaches</Link>
        <Link to="/players">Players</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      <div className="image-container">
        <Image fluid={data.file.childImageSharp.fluid} alt="Team logo." />
      </div>
      <p>This site was created by <a className="attribution-link" href="https://inthezone.dev" target="_blank" rel="noopener noreferrer">In the Zone Development</a> using the <a className="attribution-link" href="https://inthezone.dev" target="_blank" rel="noopener noreferrer">TeamPagePlaceholderName platform</a>.</p>
    </>
  )

  return (
    <>
      <header>{header}</header>
      <main className={`${cssPageName ? `page-${cssPageName}` : ""}`}>{children}</main>
      <footer>{footer}</footer>
    </>
  )
}

export default Layout