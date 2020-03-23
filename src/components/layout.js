import React from "react"
import { Link } from "gatsby"
import '../styles/reset.scss'
import '../styles/global.scss'
import '../styles/home-hero.scss'

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import BackgroundImage from "gatsby-background-image"

const Layout = ({ location, children }) => {
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
    instagramLogo: file(absolutePath: { regex: "/instagram-logo.png/" }) {
      childImageSharp {
        fixed(width: 75, height: 75) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    homeHero: file(absolutePath: { regex: "/home-hero.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    site {
      siteMetadata {
        title
        social {
          twitter
          facebook
          instagram
        }
      }
    }
    siteInfoJson {
      totalSponsorships
    }
  }
    `)

  const totalSponsorships = data.siteInfoJson.totalSponsorships
  const rootPath = `${__PATH_PREFIX__}/`
  let header

  if (location.pathname === rootPath) {
    header = (
      <BackgroundImage
        Tag="section"
        className="container-home-hero"
        fluid={data.homeHero.childImageSharp.fluid}
      >
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

            <Link to="/Our Story" className="link">
              Our Story
              </Link>
            <Link to="/dear-sponsors" className="link">
              Dear Sponsors
              </Link>
            <Link to="/blog" className="link">
              Blog
              </Link>
          </span>
          <span className="social-icons">
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="facebook"
              href={`https://facebook.com${data.site.siteMetadata.social.facebook}`}
            >
              <Image
                className="facebook-img"
                fixed={data.facebookLogo.childImageSharp.fixed}
                alt={`${data.site.siteMetadata.title}'s Facebook Group`}
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="twitter"
              href={`https://twitter.com${data.site.siteMetadata.social.twitter}`}
            >
              <Image
                className="twitter-img"
                fixed={data.twitterLogo.childImageSharp.fixed}
                alt={`${data.site.siteMetadata.title}'s Twitter Page`}
              />
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              className="instagram"
              href={`https://instagram.com${data.site.siteMetadata.social.instagram}`}
            >
              <Image
                className="instagram-img"
                fixed={data.instagramLogo.childImageSharp.fixed}
                alt={`${data.site.siteMetadata.title}'s Instagram Page`}
              />
            </a>
          </span>
        </nav>
        <p className="total-sponsorships">{totalSponsorships}</p>
        <div className="subline">
          <p>Players&nbsp;Sponsored through</p>
          <h1>Adopt&nbsp;a&nbsp;Minor&nbsp;Leaguer</h1>
        </div>
      </BackgroundImage>
    )
  } else {
    header = (
      <div className="page-hero">
        A navbar goes here.
      </div>
    )
  }
  return (
    <>
      <header>{header}</header>
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.org">Gatsby</a>
      </footer>
    </>
  )
}

export default Layout
