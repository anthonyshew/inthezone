import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import Image from "gatsby-image"
import "../styles/components/layout.scss"
import { getOriginalImageName } from "../utils/getOriginalImageName"

import useSetFavicon from "../hooks/useSetFavicon"
import SEO from "./seo"
import MobileMenu from "./mobileMenu"

export default ({ location, title, description, seoImage, children }) => {
  const { data, colors, teamLogos, teamName, pages } = useStaticQuery(graphql`
  query LayoutQuery {
    teamLogos: allFile(filter: {sourceInstanceName: {eq: "teamLogo"}}) {
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
    teamName: file(sourceInstanceName: {eq: "basics"}) {
      childContentJson {
        teamName
      }
    }
    data: file(sourceInstanceName: {eq: "basics"}) {
      childContentJson {
        teamLogo
      }
    }
    pages: allFile(filter: {sourceInstanceName: {eq: "customPages"}}) {
      edges {
        node {
          childMarkdownRemark {
            fields {
              slug
            }
            frontmatter {
                title
            }
          }
        }
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

  const teamLogo = teamLogos.edges.find(({ node }) => node.childImageSharp.fluid.originalName === getOriginalImageName(data.childContentJson.teamLogo)).node.childImageSharp.fluid
  const primaryColor = colors.childContentJson.primaryColor
  const secondaryColor = colors.childContentJson.secondaryColor
  const textColor = colors.childContentJson.textColor

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useSetFavicon(data.childContentJson.teamLogo)


  let header, footer

  header = (
    <>
      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}
      <nav className="navbar" style={{ backgroundColor: primaryColor }}>
        <button className="button-menu-opener" onClick={() => setIsMenuOpen(true)} style={{ backgroundColor: primaryColor, color: textColor }}>Menu</button>
        <LinkList textColor={textColor} />
        <div className="header-image-container">
          <svg className="svg-body" viewBox="0 0 129 129" fill="green" xmlns="http://www.w3.org/2000/svg">
            <path className="dsvg-path" d="M0 64.5V0H129V64.5L64.5 129L0 64.5Z" style={{ fill: primaryColor }} />
          </svg>
          <Image className="team-logo" fluid={teamLogo} alt="Team logo." style={{ position: "absolute" }} />
        </div>
      </nav>

      <div className="text-bar" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
        <p>Home of</p>
        <p>{teamName.childContentJson.teamName}</p>
      </div>
    </>
  )

  footer = (
    <>
      <nav className="navbar" style={{ backgroundColor: primaryColor }}>
        <div className="image-container">
          <Image fluid={teamLogo} alt="Team logo." />
        </div>
        <div className="pages-container">
          <h4 style={{ color: secondaryColor }}>Pages</h4>
          <Link to="/" style={{ color: textColor }}>Home</Link>
          <Link to="/schedule" style={{ color: textColor }}>Schedule</Link>
          <Link to="/coaches" style={{ color: textColor }}>Coaches</Link>
          <Link to="/players" style={{ color: textColor }}>Players</Link>
          <Link to="/contact" style={{ color: textColor }}>Contact Us</Link>
        </div>
        <div className="footer-explore-container">
          <h4 style={{ color: secondaryColor }}>Explore</h4>
          {pages.edges.map(({ node }) => <Link key={node.childMarkdownRemark.fields.slug} className="link" to={`/page${node.childMarkdownRemark.fields.slug}`}>{node.childMarkdownRemark.frontmatter.title}</Link>)}
        </div>
      </nav>

      <p className="attribution" style={{ color: secondaryColor }}>This site was created by <a className="attribution-link" style={{ color: secondaryColor }} href="https://inthezone.dev" target="_blank" rel="noopener noreferrer">In the Zone Development</a> using the <a className="attribution-link" style={{ color: secondaryColor }} href="https://teamstage.inthezone.dev" target="_blank" rel="noopener noreferrer">TeamStage platform</a>.</p>
    </>
  )

  return (
    <>
      <SEO title={title} description={description} image={seoImage} />
      <header>{header}</header>
      <main className={`page-${title.replace(/\s+/g, "-").replace(/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~]/g, '').toLowerCase()}`}>{children}</main>
      <footer className="footer" style={{ backgroundColor: primaryColor }}>{footer}</footer>
    </>
  )
}

const LinkList = ({ textColor }) => (
  <div className="link-list">
    <Link to="/" style={{ color: textColor }}>Home</Link>
    <Link to="/schedule" style={{ color: textColor }}>Schedule</Link>
    <Link to="/coaches" style={{ color: textColor }}>Coaches</Link>
    <Link to="/players" style={{ color: textColor }}>Players</Link>
    <Link to="/contact" style={{ color: textColor }}>Contact</Link>
  </div>
)