import React from "react"
import { Link, graphql } from "gatsby"
import '../styles/index.scss'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Image from "gatsby-image"

import useMediaQuery from '../hooks/useMediaQuery'

const Index = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges

  const isSmallViewport = useMediaQuery(`(max-width: 450px)`)

  return (
    <Layout location={location}>
      <SEO title="Home" />

      <section className="section-messages">
        <div className="container-message container-player-message">
          <h2>Dear Player,</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div className="container-link-button">
            <Link className="link-button" to="/dear-players">
              More&nbsp;Info&nbsp;&<br />Player&nbsp;Sign-Up
          </Link>
          </div>
        </div>
        <div className="container-message container-sponsor-message">
          <h2>Dear Sponsor,</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div className="container-link-button">
            <Link className="link-button" to="/dear-sponsors">
              More&nbsp;Info&nbsp;&<br />Sponsor&nbsp;Registration
          </Link>
          </div>
        </div>
      </section>

      <section className="section-carousel">
        <h2>How A Sponsorship Happens</h2>
        <div className="carousel">
          A carousel goes here.
        </div>
      </section>

      <section className="section-story">
        <h2>Our Story</h2>
        <div className="background-block">
          <div className="text">
            <h3>Making baseball happen through pure goodwill.</h3>
            <p>We connected a player with a sponsor.</p>
            <p>Then, we did it again.</p>
            <p>Then, we did it again...</p>
            <Link className="link-button" to="/our-story">
              {isSmallViewport ? "Our Story" : "Find Out How We Came To Be"}
            </Link>
          </div>
          <div className="person-block company">
            <Image
              className="avatar"
              fixed={data.companyLogo.childImageSharp.fixed}
              alt="Us, matchmaker."
            />
            <p>AaML,<br />Matchmaker</p>
          </div>
          <div className="person-block player">
            <Image
              className="avatar"
              fixed={data.anthony.childImageSharp.fixed}
              alt="Anthony Shew, baseball player."
            />
            <p>Anthony Shew,<br />Player</p>
          </div>
          <div className="person-block sponsor">
            <Image
              className="avatar"
              fixed={data.corrins.childImageSharp.fixed}
              alt="The Corrins, fan sponsor."
            />
            <p>The Corrins,<br />Sponsor</p>
          </div>
        </div>
      </section>

      {posts.map(({ node }) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article key={node.fields.slug}>
            <header>
              <h3>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.frontmatter.description || node.excerpt,
                }}
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query IndexQuery {
    companyLogo: file(absolutePath: { regex: "/aaml-logo.png/" }) {
      childImageSharp {
        fixed(width: 90, height: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    anthony: file(absolutePath: {regex: "/anthony-shew.png/"}) {
      childImageSharp {
        fixed(width: 90, height: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    corrins: file(absolutePath: {regex: "/the-corrins.png/"}) {
      childImageSharp {
        fixed(width: 90, height: 90) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 2) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
          }
        }
      }
    }
  }
`
