import React from "react"
import '../../styles/thank-you.scss'
import { Link } from 'gatsby'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

export default ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title="Thank You!" >
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Adopt a Minor Leaguer Thanks You" />
            </SEO>
            <div className="page-donation-thank-you">
                <h1>Thank you!</h1>
                <p>Your donation will have a direct impact on improving the lives of minor league baseball players.</p>
                <p>You will be receiving your tax-deductible receipt shortly.</p>
                <div className="link-button-container">
                    <Link to="/" className="link-button">Back to Home</Link>
                </div>
            </div>
        </Layout>
    )
}