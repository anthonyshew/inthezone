import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import '../styles/index.scss'

import { ImageMatcher } from "../components/imageMatcher"

import Layout from "../components/layout"

export default ({ location }) => {
  const { homePageData,
    colors,
    heroImages,
    customPagesData,
    customPageImgs,
    blogPosts,
    teams,
    socialMediaLinks } = useStaticQuery(graphql`
    {
      ...AllHeroImages
      ...HomePageData
      ...AllCustomPageData
      ...AllCustomPageImages
      ...AllBlogPosts
      ...AllTeamsData
      ...SocialMediaLinks
      ...Colors
    }
    `)

  const homePageJson = homePageData.childContentJson
  const customPages = customPagesData.edges
  const customPageImages = customPageImgs.edges
  const blog = blogPosts.edges

  const { primaryColor, secondaryColor, textColor } = colors.childContentJson.colors

  return (
    <Layout location={location} title="Home">
      <section className="hero">
        <ImageMatcher
          className="hero-image"
          imageSharps={heroImages.edges}
          originalName={homePageData.childContentJson.heroImage}
          alt={homePageData.childContentJson.heroText}
          style={{ position: "absolute" }}
        />
        {homePageJson.heroText && <h2 style={{ color: textColor }}>{homePageJson.heroText}</h2>}
        <div className="social-icon-links">
          {socialMediaLinks.childContentJson.socials.instagram.length > 0 && <a className="social-icon" target="_blank" rel="noopener noreferrer" href={socialMediaLinks.childContentJson.socials.instagram}><img src="/media/instagram-logo.png" alt="Head to our Instagram page." /></a>}
          {socialMediaLinks.childContentJson.socials.twitter.length > 0 && <a className="social-icon" target="_blank" rel="noopener noreferrer" href={socialMediaLinks.childContentJson.socials.twitter}><img src="/media/twitter-logo.png" alt="Head to our Twitter page." /></a>}
          {socialMediaLinks.childContentJson.socials.facebook.length > 0 && <a className="social-icon" target="_blank" rel="noopener noreferrer" href={socialMediaLinks.childContentJson.socials.facebook}><img src="/media/facebook-logo.png" alt="Head to our Facebook page." /></a>}
          {socialMediaLinks.childContentJson.socials.youtube.length > 0 && <a className="social-icon" target="_blank" rel="noopener noreferrer" href={socialMediaLinks.childContentJson.socials.youtube}><img src="/media/youtube-logo.png" alt="Head to our Youtube page." /></a>}
        </div>
      </section>

      <section className="panels" style={{ background: `linear-gradient(22deg, transparent 55%, ${secondaryColor} 55%)` }}>
        <h2 className="panels-header" style={{ color: primaryColor }}>Teams</h2>
        <div className="panels-container">
          {teams.edges.map(({ node }) => (
            <Link
              key={node.childTeamsJson.ageGroup}
              className="index-link-button"
              to={`/teams/${node.childTeamsJson.ageGroup.toLowerCase().replace(" ", "-")}`}
              style={{ backgroundColor: primaryColor, color: textColor }}>
              <h3 className="link-text">{node.childTeamsJson.ageGroup}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="team-proposition" style={{ backgroundColor: textColor, color: primaryColor }}>
        <p style={{ color: secondaryColor }}>{homePageJson.auxText}</p>
      </section>

      {homePageJson.quotation && <Testimonial homePageJson={homePageJson} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}

      {customPages.length > 0 && <Explore customPages={customPages} customPageImgs={customPageImages} secondaryColor={secondaryColor} />}

      {blog.length > 0 && <Blog blog={blog} primaryColor={primaryColor} secondaryColor={secondaryColor} />}

    </Layout>
  )
}

const Testimonial = ({ homePageJson, primaryColor, secondaryColor, textColor }) => (
  <section className="testimonial-container" style={{ background: primaryColor, color: textColor }}>
    <img className="avatar" src="/media/avatar.png" alt="Avatar." />
    <span className="quotation-mark open" style={{ color: secondaryColor }}>"</span>
    <p className="quotation" style={{ color: textColor }}>{homePageJson.quotation}</p>
    <span className="quotation-mark close" style={{ color: secondaryColor }}>"</span>
    <p className="attribution" style={{ color: textColor }}>- {homePageJson.quoteAttr}</p>
  </section>
)

const Explore = ({ customPages, customPageImgs, secondaryColor }) => (
  <section className="explore-container">
    <h2 className="explore-heading" style={{ color: secondaryColor }}>Explore</h2>
    <div className="explore-tiles-container">
      {customPages.map(({ node }) => {
        const { fields, frontmatter } = node.childMarkdownRemark

        return (
          <Link key={fields.slug} className="explore-tile" to={`/page${fields.slug}`}>
            <ImageMatcher
              className="background-image"
              imageSharps={customPageImgs}
              originalName={frontmatter.coverImage}
              alt={frontmatter.title}
            />
            <div className="dimmer-gradient">
              <h3 className="link-title">{frontmatter.title}</h3>
              <p className="link-description">{frontmatter.shortDescription}</p>
            </div>
          </Link>
        )
      })}
    </div>
  </section>
)

const Blog = ({ blog, primaryColor, secondaryColor }) => {

  return (
    <section className="blog-container">
      <h2 className="blog-heading" style={{ color: secondaryColor }}>Blog</h2>

      {blog.map(({ node }) => {
        const { fields, frontmatter } = node.childMarkdownRemark
        return (
          <Link
            key={fields.slug}
            className="blog-link"
            to={`blog${fields.slug}`}
          >
            <h4 style={{ color: primaryColor }}>{frontmatter.title}</h4>
            <p style={{ color: secondaryColor }}>{frontmatter.description}</p>
          </Link>
        )
      })}

      <div className="link-container">
        <Link className="all-posts-link" to="/blog" style={{ backgroundColor: secondaryColor, color: primaryColor }}>All Posts</Link>
      </div>
    </section>
  )
}