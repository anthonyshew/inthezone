import React from "react"
import '../styles/about-us.scss'
import '../styles/panel.scss'
import { Link, useStaticQuery, graphql } from 'gatsby'

import BackgroundImage from 'gatsby-background-image'
import Image from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

import Baseball from '../svg/baseball.svg'
import Service from '../svg/service.svg'
import Balance from '../svg/balance.svg'
import Checkmark from '../svg/checkmark.svg'
import User from '../svg/userWithTie.svg'
import UserWithCog from '../svg/userWithCog.svg'
import UserWithPencil from '../svg/userWithPen.svg'

export default ({ location }) => {
    const data = useStaticQuery(graphql`
        query AboutPageQuery {
            banner: file(absolutePath: { regex: "/about-banner.jpg/" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
            }
            aamlLogo: file(absolutePath: { regex: "/aaml-logo.png/" }) {
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
            <SEO title="About Us" />
            <div className="page-about-us">
                <BackgroundImage
                    Tag="div"
                    fluid={data.banner.childImageSharp.fluid}
                    style={{ backgroundPosition: "bottom", marginBottom: "2rem" }}
                >
                    <div className="container-inner-background">
                        <h1>About Us</h1>
                    </div>
                </BackgroundImage>
                <section>
                    <h2>Mission Statement</h2>
                    <p className="mission-statement">To make the lives of minor league baseball players more fulfilling.</p>
                </section>
                <section className="company-values-container">
                    <h2>Our Values</h2>
                    <div className="company-values">
                        <div className="value-container">
                            <span className="icon">
                                <h3>Player Committed</h3>
                                <Baseball />
                            </span>
                            <p>In our work, players come first and foremost. Any time we feel like we can't make a decision easily, we ask ourselves "How would players benefit the most?" That usually leads us to where we need to go pretty quickly.</p>
                        </div>
                        <div className="value-container">
                            <span className="icon">
                                <h3>Service</h3>
                                <Service />
                            </span>
                            <p>If we as an organization are to execute our mission statement, we must act from a place of altruism. Our goals are to improve the lives of others and we mean to put them first whenever we can.</p>
                        </div>
                        <div className="value-container">
                            <span className="icon">
                                <h3>Integrity</h3>
                                <Balance />
                            </span>
                            <p>We will let the dictionary speak for itself here. Definition #1: the quality of being honest and having strong moral principles. Definition #2: the state of being whole and undivided.</p>
                        </div>
                        <div className="value-container">
                            <span className="icon">
                                <h3>Accountability</h3>
                                <Checkmark />
                            </span>
                            <p>We strongly believe that staying accountable is the only way that we can run our non-profit properly. We want to remain transparent with our work and become a trustworthy and reputable member of the baseball commnity.</p>
                        </div>
                    </div>
                </section>
                <section>
                    <h2>Our People</h2>
                    <PeoplePanel
                        heading="Michael Rivers"
                        text="<p>Founder</p><p>Charmain of the Board</p><p>Executive Chair</p><p>President</p>"
                        svg={<User />}
                    />
                    <PeoplePanel
                        heading="Anthony Shew"
                        text="<p>Co-Founder</p><p>Board Member, Player Representative</p><p>Secretary</p><p>Software Engineer</p>"
                        svg={<UserWithCog />}
                    />
                    <PeoplePanel
                        heading="Mariana Guzman"
                        text="<p>Co-Founder</p><p>Board Member, Latin Affairs</p><p>Head of Sponsor Relations</p><p>Head of Latin Communications</p>"
                        svg={<UserWithPencil />}
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