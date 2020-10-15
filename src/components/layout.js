import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import "../styles/components/layout.scss"

import useSetFavicon from "../hooks/useSetFavicon"
import SEO from "./seo"
import { ImageMatcher } from "./imageMatcher"
import MobileMenu from "./mobileMenu"
import Phone from "./svg/phone"
import Map from "./svg/map"

export default ({ location, title, description, seoImage, children }) => {
  const { orgBasics,
    colors,
    allOrgLogos,
    customPagesData,
    socialMediaLinks,
    teams,
    contactInfo,
    blogPosts } = useStaticQuery(graphql`
  query LayoutQuery {
    ...AllOrgLogos
    ...OrganizationBasics
    ...AllCustomPageData
    ...Colors
    ...SocialMediaLinks
    ...AllTeamsData
    ...ContactInfo
    ...AllBlogPosts
  }
  `)

  const { primaryColor, secondaryColor, textColor } = colors.childContentJson.colors

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  useSetFavicon(orgBasics.childContentJson.teamLogo)

  let header, footer

  header = (
    <>
      {isMenuOpen && <MobileMenu setIsMenuOpen={setIsMenuOpen} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}
      <nav className="navbar" style={{ backgroundColor: primaryColor }}>
        <button className="button-menu-opener" onClick={() => setIsMenuOpen(true)} style={{ backgroundColor: primaryColor, color: textColor }}>Menu</button>
        <LinkList textColor={textColor} blogPosts={blogPosts} />
        <div className="header-image-container">
          <svg className="svg-body" viewBox="0 0 129 129" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className="dsvg-path" d="M0 64.5V0H129V64.5L64.5 129L0 64.5Z" style={{ fill: primaryColor }} />
          </svg>
          <ImageMatcher
            className="team-logo"
            imageSharps={allOrgLogos.edges}
            originalName={orgBasics.childContentJson.orgLogo}
            alt="Team logo."
            style={{ position: "absolute" }}
          />
        </div>
      </nav>

      <div className="text-bar" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
        <p>Home of</p>
        <p>{orgBasics.childContentJson.orgName}</p>
      </div>
    </>
  )

  footer = (
    <>
      <nav className="navbar" style={{ backgroundColor: primaryColor }}>
        <div className="first-container">
          <ImageMatcher
            className="team-logo"
            imageSharps={allOrgLogos.edges}
            originalName={orgBasics.childContentJson.orgLogo}
            alt="Team logo."
          />
          <div className="contact-line" style={{ color: textColor }}><Phone fill={secondaryColor} /><span>{contactInfo.childContentJson.contactInfo.phoneNumber}</span></div>
          <div className="contact-line" style={{ color: textColor }}><Map fill={secondaryColor} /><span><p>{contactInfo.childContentJson.contactInfo.address.streetAddress},</p> {contactInfo.childContentJson.contactInfo.address.city} {contactInfo.childContentJson.contactInfo.address.state} {contactInfo.childContentJson.contactInfo.address.zipCode}</span></div>
        </div>
        <div className="pages-container">
          <h4 style={{ color: secondaryColor }}>Pages</h4>
          <Link to="/" style={{ color: textColor }}>Home</Link>
          <Link to="/about" style={{ color: textColor }}>About</Link>
          {customPagesData.edges.map(({ node }) =>
            <Link
              key={node.childMarkdownRemark.fields.slug}
              className="link"
              to={`/page${node.childMarkdownRemark.fields.slug}`}
              style={{ color: textColor }}
            >
              {node.childMarkdownRemark.frontmatter.title}
            </Link>
          )}
          <Link to="/shop" style={{ color: textColor }}>Shop</Link>
          {blogPosts.edges.length > 0 && <Link to="/blog" style={{ color: textColor }}>Blog</Link>}
          <Link to="/gallery" style={{ color: textColor }}>Gallery</Link>
          <Link to="/contact" style={{ color: textColor }}>Contact Us</Link>
        </div>

        <div className="teams-container">
          <h4 style={{ color: secondaryColor }}>Teams</h4>
          {teams.edges.map(({ node }) => (
            <Link
              key={node.childTeamsJson.ageGroup}
              className="link"
              to={`/teams/${node.childTeamsJson.ageGroup}`}
              style={{ color: textColor }}
            >
              {node.childTeamsJson.ageGroup}
            </Link>
          ))}
        </div>
      </nav>

      <div className="social-icon-links">
        {socialMediaLinks.childContentJson.socials.instagram.length > 0 && <a className="social-icon" target="_blank" rel="noopener noreferrer" href={socialMediaLinks.childContentJson.socials.instagram}><img src="/media/instagram-logo.png" alt="Head to our Instagram page." /></a>}
        {socialMediaLinks.childContentJson.socials.twitter.length > 0 && <a className="social-icon" target="_blank" rel="noopener noreferrer" href={socialMediaLinks.childContentJson.socials.twitter}><img src="/media/twitter-logo.png" alt="Head to our Twitter page." /></a>}
        {socialMediaLinks.childContentJson.socials.facebook.length > 0 && <a className="social-icon" target="_blank" rel="noopener noreferrer" href={socialMediaLinks.childContentJson.socials.facebook}><img src="/media/facebook-logo.png" alt="Head to our Facebook page." /></a>}
        {socialMediaLinks.childContentJson.socials.youtube.length > 0 && <a className="social-icon" target="_blank" rel="noopener noreferrer" href={socialMediaLinks.childContentJson.socials.youtube}><img src="/media/youtube-logo.png" alt="Head to our Youtube page." /></a>}
      </div>
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

const LinkList = ({ textColor, blogPosts }) => (
  <div className="link-list">
    <Link to="/" style={{ color: textColor }}>Home</Link>
    <Link to="/about" style={{ color: textColor }}>About</Link>
    <Link to="/shop" style={{ color: textColor }}>Shop</Link>
    {blogPosts.edges.length > 0 && <Link to="/blog" style={{ color: textColor }}>Blog</Link>}
    <Link to="/gallery" style={{ color: textColor }}>Gallery</Link>
    <Link to="/contact" style={{ color: textColor }}>Contact</Link>
  </div>
)