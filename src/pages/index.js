import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Image from "gatsby-image"
import '../styles/index.scss'
import { getOriginalImageName } from "../utils/getOriginalImageName"

import Layout from "../components/layout"
import Schedule from "../components/svg/schedule"
import Coach from "../components/svg/coach"
import Player from "../components/svg/player"

export default ({ location }) => {
  const { homePageData, colors, heroImages, customPagesData, customPageImgsData, blogPosts } = useStaticQuery(graphql`
    {
        heroImages: allFile(filter: {sourceInstanceName: {eq: "homePageImgs"}}) {
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
        homePageData: file(sourceInstanceName: {eq: "homePage"}) {
            childContentJson {
                heroImage
                heroText
                quotation
                quoteAttr
                teamLogo
                teamName
                auxText
            }
          }
        customPagesData: allFile(filter: {sourceInstanceName: {eq: "customPages"}}) {
          edges {
            node {
              childMarkdownRemark {
                fields {
                    slug
                }
                frontmatter {
                  coverImage
                  shortDescription
                  title
                }
              }
            }
          }
        }
        customPageImgsData: allFile(filter: {sourceInstanceName: {eq: "customPageImgs"}}) {
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
          blogPosts: allFile(filter: {sourceInstanceName: {eq: "blog"}}) {
            edges {
              node {
                childMarkdownRemark {
                  fields {
                    slug
                  }
                  frontmatter {
                    title
                    description
                  }
                  html
                }
              }
            }
          }
        colors: file(sourceInstanceName: {eq: "colors"}) {
            childContentJson {
              secondaryColor
              primaryColor
              textColor
            }
          }
    }
    `)

  const heroImage = heroImages.edges.find(({ node }) => node.childImageSharp.fluid.originalName === getOriginalImageName(homePageData.childContentJson.heroImage)).node.childImageSharp.fluid
  const homePageJson = homePageData.childContentJson
  const customPages = customPagesData.edges
  const customPageImgs = customPageImgsData.edges
  const blog = blogPosts.edges

  const primaryColor = colors.childContentJson.primaryColor
  const secondaryColor = colors.childContentJson.secondaryColor
  const textColor = colors.childContentJson.textColor

  return (
    <Layout location={location} title="Home">
      <section className="hero">
        <Image className="hero-image" fluid={heroImage} alt={homePageJson.heroText} style={{ position: "absolute" }} />
        {homePageJson.heroText && <h2 style={{ color: textColor }}>{homePageJson.heroText}</h2>}
      </section>

      <section className="panels" style={{ background: `linear-gradient(22deg, transparent 55%, ${secondaryColor} 55%)` }}>
        <Link className="index-link-button schedule" to="/schedule" style={{ backgroundColor: primaryColor, color: textColor }} >
          <Schedule primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />
          <h2 className="link-text">Schedule</h2>
        </Link>
        <Link className="index-link-button coaches" to="/coaches" style={{ backgroundColor: primaryColor, color: textColor }}>
          <Coach primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />
          <h2 className="link-text">Coaches</h2>
        </Link>
        <Link className="index-link-button players" to="/players" style={{ backgroundColor: primaryColor, color: textColor }}>
          <Player primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />
          <h2 className="link-text">Players</h2>
        </Link>
      </section>

      <section className="team-proposition" style={{ backgroundColor: textColor, color: primaryColor }}>
        <p style={{ color: secondaryColor }}>{homePageJson.auxText}</p>
      </section>

      {homePageJson.quotation && <Testimonial homePageJson={homePageJson} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}

      {customPages.length > 0 && <Explore customPages={customPages} customPageImgs={customPageImgs} secondaryColor={secondaryColor} />}

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
            <Image className="background-image" fluid={customPageImgs.find(image => image.node.childImageSharp.fluid.originalName === getOriginalImageName(frontmatter.coverImage)).node.childImageSharp.fluid} />
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

    </section>
  )
}