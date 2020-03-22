import React from "react"
import { Link } from "gatsby"
import '../styles/reset.scss'
import '../styles/global.scss'
import '../styles/home-hero.scss'

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Layout = ({ location, title, children }) => {
  const data = useStaticQuery(graphql`
  query LayoutQuery {
    companyLogo: file(absolutePath: { regex: "/aaml-logo.png/" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    facebookLogo: file(absolutePath: { regex: "/facebook-logo.png/" }) {
      childImageSharp {
        fixed(width: 75, height: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twitterLogo: file(absolutePath: { regex: "/twitter-logo.png/" }) {
      childImageSharp {
        fixed(width: 75, height: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
        social {
          twitter
          facebook
        }
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
                fixed={data.companyLogo.childImageSharp.fixed}
                alt={data.site.siteMetadata.title}
              />
            </Link>
          </span>
          <span className="link-list">
            <Link to="/dear-players" className="link">
              Dear Players
              </Link>
            <Link to="/dear-sponsors" className="link">
              Dear Sponsors
              </Link>
            <Link to="/Our Story" className="link">
              Our Story
              </Link>
            <Link to="/Blog" className="link">
              Blog
              </Link>
          </span>
          <span className="social-icons">
            <a target="_blank" rel="noopener noreferrer" href={`http://facebook.com${data.site.siteMetadata.social.facebook}`}>
              <Image
                className="facebook"
                fixed={data.facebookLogo.childImageSharp.fixed}
                alt={`${data.site.siteMetadata.title}'s Facebook Group`}
              />
            </a>
            <a target="_blank" rel="noopener noreferrer" href={`http://twitter.com${data.site.siteMetadata.social.twitter}`}>
              <Image
                className="twitter"
                fixed={data.twitterLogo.childImageSharp.fixed}
                alt={`${data.site.siteMetadata.title}'s Twitter Page`}
              />
            </a>
          </span>
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
