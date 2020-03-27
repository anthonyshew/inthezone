import React from "react"
import { Link } from "gatsby"
import '../styles/reset.scss'
import '../styles/global.scss'
import '../styles/navbar.scss'
import '../styles/home-hero.scss'
import '../styles/footer.scss'

import useMediaQuery from '../hooks/useMediaQuery'

import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import BackgroundImage from "gatsby-background-image"

const Layout = ({ location, children }) => {
  const data = useStaticQuery(graphql`
  query LayoutQuery {
    companyLogoLarge: file(absolutePath: { regex: "/aaml-logo.png/" }) {
      childImageSharp {
        fixed(width: 150, height: 150) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    companyLogoSmall: file(absolutePath: { regex: "/aaml-logo.png/" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
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

  const isSmallDisplay = useMediaQuery(`(max-width: 1000px)`)
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
        {isSmallDisplay ? <SmallDisplayNav data={data} /> : <IndexNav data={data} />}
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
      <footer className="footer">
        <div className="pages">
          <p>Pages</p>
          <ul className="footer-link-list">
            <li><Link className="link" activeClassName="active" to="/">Home</Link></li>
            <li><Link className="link" activeClassName="active" to="/dear-players">Dear Players</Link></li>
            <li><Link className="link" activeClassName="active" to="/dear-sponsors">Dear Sponsors</Link></li>
            <li><Link className="link" activeClassName="active" to="/ourstory">Our Story</Link></li>
            <li><Link className="link" activeClassName="active" to="/blog">Blog</Link></li>
            <li><Link className="link" activeClassName="active" to="/contact-us">Contact Us</Link></li>
            <li><Link className="link" activeClassName="active" to="/terms-of-use">Terms of Use</Link></li>
            <li><Link className="link" activeClassName="active" to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className="socials">
          <p>Connect With Us!</p>
          <span className="icons">
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
        </div>
        <div className="logo-container">
          <Image
            Tag="section"
            className="container-home-hero"
            fixed={data.companyLogoLarge.childImageSharp.fixed}
          />
          <p className="tagline">#StandWithMiLB</p>
        </div>
      </footer>
    </>
  )
}

export default Layout

const IndexNav = ({ data }) => (
  <nav className="navbar">
    <span className="logo">
      <Link to="/">
        <Image
          className="site-logo"
          fixed={data.companyLogoLarge.childImageSharp.fixed}
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
)

const SmallDisplayNav = ({ data }) => {
  return (
    <nav className="navbar mobile-navbar">
      <span className="logo">
        <Link to="/">
          <Image
            className="site-logo mobile"
            fixed={data.companyLogoSmall.childImageSharp.fixed}
            alt={data.site.siteMetadata.title}
          />
        </Link>
      </span>
      <Hamburger />
    </nav>
  )
}

const Hamburger = ({ ...props }) => (
  <span className="hamburger-container">
    <svg className="hamburger" viewBox="0 0 131 97" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 6C0 2.68629 2.68629 0 6 0H125C128.314 0 131 2.68629 131 6V91C131 94.3137 128.314 97 125 97H6C2.68629 97 0 94.3137 0 91V6Z" fill="#00235B" />
      <rect x="28.5" y="24.5" width="71" height="10" rx="3.5" fill="#CC0001" stroke="#CC0001" />
      <rect x="29" y="43" width="72" height="11" rx="4" fill="#CC0001" />
      <rect x="29.5" y="61.5" width="71" height="10" rx="3.5" fill="#CC0001" stroke="#CC0001" />
    </svg>
  </span>
)