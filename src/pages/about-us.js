import React from "react"
import '../styles/about-us.scss'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
    return (
        <Layout location={location}>
            <SEO title="About Us" />
            <div className="page-about-us">
                <h1>About Us</h1>
            </div>
        </Layout>
    )
}