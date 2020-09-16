import React from "react"
import { Link, graphql } from "gatsby"
import "../styles/templates/blog-list.scss"

import Layout from "../components/layout"

export default ({ data, pageContext, location }) => {

    const { currentPage, numPages } = pageContext
    const { primaryColor, secondaryColor, textColor } = data.colors.childContentJson.colors
    const posts = data.allFile.edges

    const firstPage = `/blog/`
    const secondPage = `/blog/2`
    const lastPage = `/blog/${numPages}`

    return (
        <Layout location={location} title={`Blog: Page ${currentPage}`}>
            <h1 className="title" style={{ color: secondaryColor }}>Blog</h1>
            <BlogListNav
                location={location}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                textColor={textColor}
                firstPage={firstPage}
                secondPage={secondPage}
                lastPage={lastPage}
                numPages={numPages}
                currentPage={currentPage}
            />
            <section className="list-body">
                {posts.map(({ node }) => (
                    <Link
                        key={node.childMarkdownRemark.fields.slug}
                        to={`/blog${node.childMarkdownRemark.fields.slug}`}
                        className="blog-post"
                        style={{ backgroundColor: secondaryColor, color: primaryColor }}
                    >
                        <div className="flex">
                            <div className="text-container">
                                <h2 className="article-title">{node.childMarkdownRemark.frontmatter.title}</h2>
                                <p className="article-description">{node.childMarkdownRemark.frontmatter.description}</p>
                            </div>
                        </div>
                        <p className="read-link">Read</p>
                    </Link>
                ))}
            </section>
            <BlogListNav
                location={location}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                textColor={textColor}
                firstPage={firstPage}
                secondPage={secondPage}
                lastPage={lastPage}
                numPages={numPages}
                currentPage={currentPage}
            />
        </Layout >
    )
}

const BlogListNav = ({ location, primaryColor, secondaryColor, textColor, firstPage, secondPage, lastPage, numPages, currentPage }) => (
    <nav className="blog-list-nav">
        {location.pathname !== firstPage &&
            // Can we fix this? It's ugly.
            location.pathname !== "/blog" &&
            location.pathname !== secondPage &&
            <Link className="nav-link newer" to={`/blog/${currentPage - 1}`} style={{ color: secondaryColor }}>Newer</Link>
        }
        {location.pathname === secondPage
            && <Link className="nav-link newer" to={`/blog`} style={{ color: secondaryColor }}>Newer</Link>
        }
        <p className="current-page" style={{ color: primaryColor }}>Page {currentPage} of {numPages}</p>
        {location.pathname !== lastPage &&
            numPages !== 1 &&
            <Link className="nav-link older" to={`/blog/${currentPage + 1}`} style={{ color: secondaryColor }}>Older</Link>
        }
    </nav>
)

export const pageQuery = graphql`
query BlogPaginationQuery($skip: Int!, $limit: Int!) {
    allFile(skip: $skip, limit: $limit, sort: {fields: childMarkdownRemark___frontmatter___date, order: DESC}, filter: {sourceInstanceName: {eq: "blog"}, childMarkdownRemark: {frontmatter: {title: {ne: "DEVELOPMENT"}}}}) {
        edges {
            node {
              childMarkdownRemark {
                fields {
                  slug
                }
                frontmatter {
                  title
                  description
                  date
                }
              }
            }
        }
    }
    ...Colors
}
`