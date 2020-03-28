import React, { useState, useRef } from "react"
import { Link } from "gatsby"
import '../styles/reset.scss'
import '../styles/global.scss'
import '../styles/navbar.scss'
import '../styles/home-hero.scss'
import '../styles/footer.scss'

import { useStaticQuery, graphql } from "gatsby"
import useBodyScrollLock from '../hooks/useBodyScrollLock'
import Image from "gatsby-image"
import BackgroundImage from "gatsby-background-image"
import Hamburger from '../svg/hamburger.svg'
import Xburger from '../svg/Xburger.svg'

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
        <IndexNav data={data} />
        <SmallDisplayNav data={data} />
        <p className="total-sponsorships">{totalSponsorships}</p>
        <div className="subline">
          <p>Players&nbsp;Sponsored through</p>
          <h1>Adopt&nbsp;a&nbsp;Minor&nbsp;Leaguer</h1>
        </div>
      </BackgroundImage>
    )
  } else {
    header = (
      <>
        <PageNav data={data} />
        <SmallDisplayNav data={data} />
      </>
    )
  }

  return (
    <>
      <header>{header}</header>
      <main>{children}</main>
      <Footer data={data} />
    </>
  )
}

export default Layout

const IndexNav = ({ data }) => (
  <nav className="navbar full">
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
      <Link to="/our-story" className="link">
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

const PageNav = ({ data }) => (
  <nav className="navbar full page-nav">
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
      <Link to="/our-story" className="link">
        Our Story
      </Link>
      <Link to="/dear-sponsors" className="link">
        Dear Sponsors
      </Link>
      <Link to="/blog" className="link">
        Blog
      </Link>
    </span>
  </nav>
)

const SmallDisplayNav = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

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
      <span className="mobile-nav-text">
        Connecting minor leaguers with fan sponsors.
        </span>
      <span className="hamburger-container">
        <Hamburger onClick={() => setIsOpen(true)}
        />
      </span>
      {isOpen && <MobileMenu setIsOpen={setIsOpen} />}
    </nav >
  )
}

const MobileMenu = ({ setIsOpen }) => {
  useBodyScrollLock()
  const container = useRef(null)

  const handleClose = () => {
    container.current.classList.add("out")
    setTimeout(() => { setIsOpen(false) }, 250)
  }

  return (
    <div className="mobile-menu-container"
      ref={container}
      onClick={handleClose}
    >
      <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
        <Xburger onClick={handleClose} />
        <div className="content">
          <div className="link-list">
            <div className="link-container">
              <Link to="/dear-players" className="link">
                Dear Players
            </Link>
            </div>
            <div className="link-container">
              <Link to="/our-story" className="link">
                Our Story
            </Link>
            </div>
            <div className="link-container">
              <Link to="/dear-sponsors" className="link">
                Dear Sponsors
            </Link>
            </div>
            <div className="link-container">
              <Link to="/blog" className="link">
                Blog
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Footer = ({ data }) => (
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
)