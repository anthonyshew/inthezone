import React from "react"
import '../../styles/404.scss'
import { graphql } from "gatsby"

import Layout from "../../components/layout"
import SEO from "../../components/seo"

const NotFoundPage = ({ data, location }) => {
  return (
    <Layout location={location}>
      <SEO title="404: Extraviado" >
        <meta name="og:image" content="/media/aaml-logo.jpg" />
        <meta name="twitter:image" content="/media/aaml-logo.jpg" />
        <meta name="twitter:image:alt" content="Adopt a Minor Leaguer 404 Pagina" />
      </SEO>
      <div className="page-404">
        <h1>404</h1>
        <p>¡Perdonanos! Todavía estamos construyendo nuestro sitio entonces si se cree que debería haber una página aquí, vuelva más tarde en un día o dos.</p>
        <p>¡Si se está aquí por accidente, busca por una página que existe!</p>
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
