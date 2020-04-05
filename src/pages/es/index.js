import React, { useRef } from "react"
import { Link, graphql } from "gatsby"
import '../../styles/index.scss'

import useAnimateOnVisible from "../../hooks/useAnimateOnVisible"
import Layout from "../../components/layout"
import SEO from "../../components/seo"
import Carousel from '../../components/carousel'
import Image from "gatsby-image"
import Arrow from "../../svg/arrow-right.svg"

const Index = ({ data, location }) => {
  const posts = data.allMarkdownRemark.edges

  const playerMessageEs = useRef(null)
  const sponsorMessageEs = useRef(null)
  useAnimateOnVisible({ element: playerMessageEs })
  useAnimateOnVisible({ element: sponsorMessageEs })

  const playerCardEs = useRef(null)
  const sponsorCardEs = useRef(null)
  const companyCardEs = useRef(null)
  useAnimateOnVisible({ element: companyCardEs })
  useAnimateOnVisible({ element: playerCardEs })
  useAnimateOnVisible({ element: sponsorCardEs })

  return (
    <Layout location={location}>
      <SEO
        title="Home"
      >
        <meta name="og:image" content="/media/aaml-logo.jpg" />
        <meta name="twitter:image" content="/media/aaml-logo.jpg" />
        <meta name="twitter:image:alt" content="Adopt a Minor Leaguer Home Page" />
      </SEO>

      <section className="section-messages">
        <div className="es container-message container-player-message" ref={playerMessageEs}>
          <h2>Espanol,</h2>
          <p>You have a certain set of needs unlike any other. You're in the top .0001% of people who do what you do and you're a part of a multi-billion dollar industry. But it probably doesn't feel like it financially. Adopt a Minor Leaguer and our sponsor network are here to help you achieve your goals - and provide a little more comfort along the way. Our confidential process gets you the help you deserve.</p>
          <div className="container-link-button">
            <Link className="link-button" to="/dear-players">
              More&nbsp;Info&nbsp;&<br />Player&nbsp;Sign-Up
          </Link>
          </div>
        </div>
        <div className="container-message container-sponsor-message" ref={sponsorMessageEs}>
          <h2>Dear Sponsor,</h2>
          <p>You love baseball - and you know about the controversial treatment that minor leaguers receive. But here's the good part: You have the opportunity to help these young men achieve their dreams. By becoming a sponsor, you can impact a minor leaguer's life with a 1-to-1 relationship that he will remember forever.</p>
          <div className="container-link-button">
            <Link className="link-button" to="/dear-sponsors">
              More&nbsp;Info&nbsp;&<br />Sponsor&nbsp;Registration
          </Link>
          </div>
        </div>
      </section>

      <section className="section-carousel">
        <h2>How A Sponsorship Happens</h2>
        <Carousel />
      </section>

      <section className="section-story">
        <h2>Our Story</h2>
        <div className="background-block">
          <div className="text">
            <h3>Making baseball happen through pure goodwill.</h3>
            <p>We connected a player with a sponsor.</p>
            <p>Then, we did it again.</p>
            <p>Then, we did it again...</p>
            <Link className="link-button" to="/about-us">
              About&nbsp;Us
            </Link>
          </div>
          <div className="person-block company" >
            <div className="inner" ref={companyCardEs}>
              <Image
                className="avatar"
                fixed={data.companyLogo.childImageSharp.fixed}
                alt="Us, matchmaker."
              />
              <p>AaML,<br />Matchmaker</p>
            </div>
          </div>
          <div className="person-block player" >
            <div className="inner" ref={playerCardEs}>
              <Image
                className="avatar"
                fixed={data.anthony.childImageSharp.fixed}
                alt="Anthony Shew, baseball player."
              />
              <p>Anthony Shew,<br />Player</p>
            </div>
          </div>
          <div className="person-block sponsor">
            <div className="inner" ref={sponsorCardEs}>
              <Image
                className="avatar"
                fixed={data.corrins.childImageSharp.fixed}
                alt="The Corrins, fan sponsor."
              />
              <p>The Corrins,<br />Sponsor</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-media">
        <h2>Extra! Extra!</h2>
        <p>We have gotten some really special attention recently - and we're proud.</p>
        <Link className="link-button" to="/media">AaML in the Media <Arrow /></Link>
      </section>

      <section className="section-blog">
        <h2>Our Blog</h2>
        {posts.map(({ node }) => {
          const title = node.frontmatter.title || node.fields.slug
          return (
            <div key={node.fields.slug} className="post">
              <header>
                <h3 className="post-title">
                  <Link to={node.fields.slug}>
                    {title}
                  </Link>
                </h3>
                <small className="post-date">{node.frontmatter.date}</small>
              </header>
              <section>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            </div>
          )
        })}
        <div className="container-link-button">
          <Link to="/blog" className="link-button">
            Visit All Posts
        </Link>
        </div>
      </section>
    </Layout>
  )
}

export default Index

export const pageQuery = graphql`
  query IndexEsQuery {
    companyLogo: file(absolutePath: { regex: "/aaml-logo.jpg/" }) {
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
