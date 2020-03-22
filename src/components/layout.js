import React from "react"
import { Link } from "gatsby"
import '../styles/reset.scss'
import '../styles/home-hero.scss'

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
  query LayoutQuery {
    logo: file(absolutePath: { regex: "/aaml-logo.png/" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
    `)

  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <div className="container-home-hero">
        <nav className="navbar">
          <span className="logo">
            <Link to="/">
              <Image
                className="site-logo"
                fixed={data.logo.childImageSharp.fixed}
                alt={data.site.siteMetadata.title}
              />
            </Link>
          </span>
          <span className="link-list">
            <Link to="/dear-players" />
          </span>
          <span className="social-icons"></span>
        </nav>
      </div>
    )
  } else {
    header = (
      <div className="page-hero">

      </div>
    )
  }
  return (
    <div
      style={{
        marginLeft: `auto`,
        marginRight: `auto`,
      }}
    >
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </div>
  )
}

export default Layout
