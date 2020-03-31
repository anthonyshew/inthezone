import React from 'react'
import '../styles/blog-index.scss'
import { Link, useStaticQuery, graphql } from 'gatsby'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ location }) => {
    const data = useStaticQuery(graphql`
    query DonateQuery {
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
            <SEO title="Donate">
                <meta name="og:image" content="/media/aaml-logo.png" />
                <meta name="twitter:image" content="/media/aaml-logo.png" />
                <meta name="twitter:image:alt" content="Adopt a Minor Leaguer Donation Page" />
            </SEO>
            <div>
                Check.
        </div>
        </Layout>
    )

}