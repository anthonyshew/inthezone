import React from "react"
import { Link, graphql } from "gatsby"
import "../styles/templates/blog-post.scss"

import Layout from "../components/layout"

const BlogPostTemplate = ({ data, pageContext, location }) => {

  const post = data.markdownRemark
  const { previous, next } = pageContext

  return (
    <Layout location={location} title={post.frontmatter.title} description={post.frontmatter.description || post.excerpt}>
      <div className="page-blog-post">
        <h1>{post.frontmatter.title}</h1>
        <p className="post-date">{post.frontmatter.date}</p>
        <section
          className="article-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        < hr />
        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={`/blog${previous.childMarkdownRemark.fields.slug}`} rel="prev">
                  ← Previous Post: {previous.childMarkdownRemark.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={`/blog${next.childMarkdownRemark.fields.slug}`} rel="next">
                  Next Up: {next.childMarkdownRemark.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
  }
`
