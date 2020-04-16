import React from "react"
import '../../styles/thank-you.scss'
import { Link } from 'gatsby'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

export default ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title="¡Gracias!" >
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Adopt a Minor Leaguer Dice Gracias" />
            </SEO>
            <div className="page-donation-thank-you">
                <h1>¡Gracias!</h1>
                <p>Tu donación impactará directamente la vida de los jugadores de Ligas Menores.</p>
                <p>Reciberás tu recibo deducible de impuestos US dentor de poco.</p>
                <div className="link-button-container">
                    <Link to="/es" className="link-button">Regrasa a Principal</Link>
                </div>
            </div>
        </Layout>
    )
}