import React, { useState, useEffect, useRef, useCallback } from "react"
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
import Xburger from '../svg/xburger.svg'

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
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    twitterLogo: file(absolutePath: { regex: "/twitter-logo.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    instagramLogo: file(absolutePath: { regex: "/instagram-logo.png/" }) {
      childImageSharp {
        fixed(width: 50, height: 50) {
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
        donate {
          shop
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
      <Link to="/dear-sponsors" className="link">
        Dear Sponsors
      </Link>
      <Link to="/about-us" className="link">
        About Us
      </Link>
      <Link to="/blog" className="link">
        Blog
      </Link>
      <a className="link" href={data.site.siteMetadata.donate.shop} target="_blank" rel="noopener noreferrer">Shop</a>
      <Link to="/donate" className="link link-special">
        Donate
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
      <Link to="/dear-sponsors" className="link">
        Dear Sponsors
      </Link>
      <Link to="/about-us" className="link">
        About Us
      </Link>
      <Link to="/blog" className="link">
        Blog
      </Link>
      <a className="link" href={data.site.siteMetadata.donate.shop} target="_blank" rel="noopener noreferrer">Shop</a>
      <Link to="/donate" className="link link-special">
        Donate
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
  const [isOpen, setIsOpen] = useState(false)

  const handleKeyboardOpen = (e) => {
    if (e.key === "Enter") setIsOpen(true)
  }

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
        <Hamburger
          tabIndex={0}
          onKeyDown={handleKeyboardOpen}
          onClick={() => setIsOpen(true)}
        />
      </span>
      {isOpen && <MobileMenu setIsOpen={setIsOpen} data={data} />}
    </nav >
  )
}

const MobileMenu = ({ setIsOpen, data }) => {
  useBodyScrollLock()
  const container = useRef()
  const first = useRef()
  const last = useRef()
  const shifted = useRef(false)

  const handleClose = useCallback((e) => {
    container.current.classList.add("out")
    setTimeout(() => { setIsOpen(false) }, 250)
  }, [setIsOpen])

  const handleKeyUp = (e) => {
    if (e.key === "Shift") shifted.current = false
  }

  useEffect(() => {
    const background = container.current
    const lastLink = last.current
    const handleKeyDown = (e) => {
      if (e.key === "Shift") shifted.current = true
      if (e.key === "Escape") handleClose()
      if (e.key === "Tab" && last.current === document.activeElement) first.current.focus()
      if (e.key === "Tab" && first.current === document.activeElement && shifted.current) last.current.focus()
    }

    first.current.focus()
    background.addEventListener('keydown', handleKeyDown)
    lastLink.addEventListener('keydown', handleKeyDown)
    background.addEventListener('keyup', handleKeyUp)

    return () => {
      background.removeEventListener('keydown', handleKeyDown)
      lastLink.removeEventListener('keydown', handleKeyDown)
      background.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleClose])

  return (
    <div className="mobile-menu-container"
      ref={container}
      role="navigation"
    >
      <div className="mobile-menu" role="region">
        <button
          className="xburger-container"
          ref={first}
          tabIndex={0}
          onClick={handleClose}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClose()
          }}
        >

          <Xburger />
        </button>

        <div className="content">
          <div className="link-list">
            <div className="link-container">
              <Link to="/dear-players" className="link">
                Dear Players
            </Link>
            </div>
            <div className="link-container">
              <Link to="/dear-sponsors" className="link">
                Dear Sponsors
            </Link>
            </div>
            <div className="link-container">
              <Link to="/donate" className="link">
                Donate
            </Link>
            </div>
            <div className="link-container">
              <a className="link" href={data.site.siteMetadata.donate.shop} target="_blank" rel="noopener noreferrer">Shop</a>
            </div>
            <div className="link-container">
              <Link to="/about-us" className="link">
                About Us
            </Link>
            </div>
            <div className="link-container">
              <Link to="/blog" className="link" ref={last} >
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
        <li><Link className="link" activeClassName="active" to="/donate">Donate</Link></li>
        <li><Link className="link" activeClassName="active" to="/about-us">About Us</Link></li>
        <li><Link className="link" activeClassName="active" to="/blog">Blog</Link></li>
        <li><a className="link" href={data.site.siteMetadata.donate.shop} target="_blank" rel="noopener noreferrer">Shop</a></li>
        <li><Link className="link" activeClassName="active" to="/contact-us">Contact Us</Link></li>
        <li><Link className="link" activeClassName="active" to="/media">Media</Link></li>
        <li><Link className="link" activeClassName="active" to="/legal/terms-of-use">Terms of Use</Link></li>
        <li><Link className="link" activeClassName="active" to="/legal/privacy-policy">Privacy Policy</Link></li>
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