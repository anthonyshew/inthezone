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
          <h2>Querido Jugador,</h2>
          <p>Tienes necesidades como nadie más. Estás en el .0001% superior gropu de gente que hacen que haces y eres un aparte de una industria multimillonaria. Pero problamente no siente asi financialmente. Adopt a Minor Leaguer and nuestro comunidad de padrinos están aqui por ayudarte con tus metas - y proveer un poco mas comodidad  en tu camina. Nuestro proceso confidencial te brinda la ayuda que mereces.</p>
          <div className="container-link-button">
            <Link className="link-button" to="/es/dear-players">
              Más&nbsp;Información&nbsp;&<br />Jugador&nbsp;Registro
          </Link>
          </div>
        </div>
        <div className="container-message container-sponsor-message" ref={sponsorMessageEs}>
          <h2>Querido Padrino,</h2>
          <p>Te encanta al beisbol - y también sabes sobre el tratamiento polémico que reciben jugadores de ligas menores. Pero, aqui esta la parte buena: Tienes la oportunidad por ayudar estos jóvenes conseguin sus sueños. Al convertirse en padrino, puedes impactar la vida de un jugador de ligas menores con un 1-a-1 relación que va a recordarle siempre. Tener un impacto en tu equipo favorito - y tu nuevo jugador favorito - hoy.</p>
          <div className="container-link-button">
            <Link className="link-button" to="/es/dear-sponsors">
              Más&nbsp;Información&nbsp;&<br />Padrino&nbsp;Registro
          </Link>
          </div>
        </div>
      </section>

      <section className="section-carousel">
        <h2>Cómo Sucede un Patricinio</h2>
        <Carousel location={location} />
      </section>

      <section className="section-story">
        <h2>Nuestra Historia</h2>
        <div className="background-block">
          <div className="text">
            <h3>Haciendo que el béisbol suceda a través de la buena voluntad puro.</h3>
            <p>Conectamos un jugador con un padrino.</p>
            <p>Y otra vez.</p>
            <p>Y otra vez...</p>
            <Link className="link-button" to="/es/about-us">
              Sobre Nosotros
            </Link>
          </div>
          <div className="person-block company" >
            <div className="inner" ref={companyCardEs}>
              <Image
                className="avatar"
                fixed={data.companyLogo.childImageSharp.fixed}
                alt="Nosotros, casamentero."
              />
              <p>AaML,<br />Casamentero</p>
            </div>
          </div>
          <div className="person-block player" >
            <div className="inner" ref={playerCardEs}>
              <Image
                className="avatar"
                fixed={data.anthony.childImageSharp.fixed}
                alt="Anthony Shew, jugador."
              />
              <p>Anthony Shew,<br />Jugador</p>
            </div>
          </div>
          <div className="person-block sponsor">
            <div className="inner" ref={sponsorCardEs}>
              <Image
                className="avatar"
                fixed={data.corrins.childImageSharp.fixed}
                alt="The Corrins, fan sponsor."
              />
              <p>The Corrins,<br />Padrinos</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-media">
        <h2>En Los Medios</h2>
        <p>Hemos recibido alguna atención - y estamos orgullosos.</p>
        <Link className="link-button" to="/media">Noticias Sobre AaML<Arrow /></Link>
      </section>

      <section className="section-blog">
        <h2>Nuestro Blog</h2>
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
            Visita Todos Artículos
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
