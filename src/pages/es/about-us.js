import React from "react"
import '../../styles/about-us.scss'
import '../../styles/panel.scss'
import { Link, useStaticQuery, graphql } from 'gatsby'

import BackgroundImage from 'gatsby-background-image'
import Image from 'gatsby-image'

import Layout from "../../components/layout"
import SEO from "../../components/seo"

import Baseball from '../../svg/baseball.svg'
import Service from '../../svg/service.svg'
import Balance from '../../svg/balance.svg'
import Checkmark from '../../svg/checkmark.svg'
import User from '../../svg/userWithTie.svg'
import UserWithCog from '../../svg/userWithCog.svg'
import UserWithPlus from '../../svg/userWithPlus.svg'

export default ({ location }) => {
    const data = useStaticQuery(graphql`
        query AboutPageEsQuery {
            banner: file(absolutePath: { regex: "/about-banner.jpg/" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
            }
            aamlLogo: file(absolutePath: { regex: "/aaml-logo.jpg/" }) {
                childImageSharp {
                  fixed(width: 150, height: 150) {
                    ...GatsbyImageSharpFixed
                  }
                }
            }
        }
    `)

    return (
        <Layout location={location}>
            <SEO title="Sobre Nosotros">
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Adopt a Minor Leaguer Sobre Nostros Pagina" />
            </SEO>

            <div className="page-about-us">
                <BackgroundImage
                    Tag="div"
                    fluid={data.banner.childImageSharp.fluid}
                    style={{ backgroundPosition: "50% 75%", marginBottom: "2rem" }}
                >
                    <div className="container-inner-background">
                        <h1>Sobre Nosotros</h1>
                    </div>
                </BackgroundImage>
                <section>
                    <h2>Nuestra Misión</h2>
                    <p className="mission-statement">Hacer que la vida de los jugadores de Ligas Menores más satisfactoria.</p>
                </section>
                <section className="company-values-container">
                    <h2>Nuestros Valores</h2>
                    <div className="company-values">
                        <div className="value-container">
                            <span className="icon">
                                <h3>Comprometidos con los Jugadores</h3>
                                <Baseball />
                            </span>
                            <p>Para nosotros, los jugadores son nuestro prioridad. Cada vez que sentimos que no podemos tomar un decisión, nos enfocamos en preguntarnos: "¿Cómo se beneficiarían mas nuestros jugadores?" Eso generalmente nos guía a tomar una rápida y eficaz decisión.</p>
                        </div>
                        <div className="value-container">
                            <span className="icon">
                                <h3>Servicio</h3>
                                <Service />
                            </span>
                            <p>Si nosotros como organización vamos a ejecutar nuestra "declaración de misión," entonces debemos hacerlo actuando de manera.</p>
                        </div>
                        <div className="value-container">
                            <span className="icon">
                                <h3>Integridad</h3>
                                <Balance />
                            </span>
                            <p>Aquí, dejaremos que el diccionario hable por nosotros. Definición #1: Cualidad de ser honesto y tener fuertes principios morales. Definición #2: Estado de ser completo e indiviso.</p>
                        </div>
                        <div className="value-container">
                            <span className="icon">
                                <h3>Responsibilidad</h3>
                                <Checkmark />
                            </span>
                            <p>Creemos firmemente que siendo responsables es la única forma en la que podemos administrar adecuadamente una organización sin fines de lucro. Queremos ser transparentes con nuestro trabajo y convertirnos en un miembro confiable y con buena reputación dentro de la comunidad del béisbol.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Nuestra Gente</h2>
                    <PeoplePanel
                        heading="Michael Rivers"
                        text="<p>Fundador Principal</p><p>Presidente de al Junta Directiva</p><p>Presidente Ejecutivo</p><p>CEO</p>"
                        svg={<User />}
                    />
                    <PeoplePanel
                        heading="Anthony Shew"
                        text="<p>Co-Fundadora</p><p>Miembro de la Junta, Representativo de Jugadores</p><p>Secretario de la Junta</p><p>CTO</p>"
                        svg={<UserWithCog />}
                    />
                    <PeoplePanel
                        heading="Mariana Guzman"
                        text="<p>Co-Fundadora</p><p>Miembro de la Junta, Asuntos Latinos</p><p>Jefe de Relaciones de los Padrinos</p><p>Jefe de Relaciones Publicas y Comunicación en Español</p>"
                        svg={<UserWithPlus />}
                    />
                </section>
            </div>
        </Layout >
    )
}

const PeoplePanel = ({
    mirror,
    heading,
    image,
    imageAlt,
    svg,
    text,
    backgroundColor,
    color,
    button,
    buttonLink,
    buttonText,
    buttonColor,
    buttonBackgroundColor }) => {
    return (
        <div className="container-slide-panel" style={{
            flexDirection: `${mirror ? 'row-reverse' : 'row'}`,
            backgroundColor: `${backgroundColor || "none"}`,
            color: color
        }}
        >
            {svg ?? <Image className="image" fixed={image} alt={imageAlt} title={imageAlt} />}
            <div className="container-inner">
                <h3 className="heading"> {heading} </h3>
                <p className="paragraph"
                    dangerouslySetInnerHTML={{
                        __html: text,
                    }}
                />
                {button ? <Link to={buttonLink} title={`Visit the "${buttonText}" page.`}>
                    <button className="link-button" style={{
                        backgroundColor: buttonBackgroundColor,
                        color: buttonColor
                    }}
                    >
                        {buttonText}
                    </button>
                </Link> : null}
            </div>
        </div>
    )
}