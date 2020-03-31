import React from "react"
import '../styles/404.scss'
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Not Found" >
        <meta name="og:image" content="/media/aaml-logo.png" />
        <meta name="twitter:image" content="/media/aaml-logo.png" />
        <meta name="twitter:image:alt" content="Adopt a Minor Leaguer 404 Page" />
      </SEO>
      <div className="page-404">
        <h1>404</h1>
        <p>Pardon our dust! We're still under construction so if you think there should be a page here, check back in a day or two and we'll have something here for you.</p>
        <p>If you've reached this page in error, find one that does exist!</p>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
