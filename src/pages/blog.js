import React from 'react'
import '../styles/blog-index.scss'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ location }) => {
  const data = useStaticQuery(graphql`
    query BlogQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
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
    }`)

  return (
    <Layout location={location}>
      <SEO title="Blog - All Posts">
        <meta name="og:image" content="/media/aaml-logo.png" />
        <meta name="twitter:image" content="/media/aaml-logo.png" />
        <meta name="twitter:image:alt" content="Adopt a Minor Leaguer Blog" />
      </SEO>

      <div className="blog-index">
        <h1>Blog</h1>
        <div className="posts">
          {data.allMarkdownRemark.edges.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <section key={node.fields.slug} className="post">
                <header>
                  <h2 className="post-title">
                    <Link to={node.fields.slug}>
                      {title}
                    </Link>
                  </h2>
                  <small className="post-date">{node.frontmatter.date}</small>
                </header>
                <p
                  dangerouslySetInnerHTML={{
                    __html: node.frontmatter.description || node.excerpt,
                  }}
                />
              </section>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}