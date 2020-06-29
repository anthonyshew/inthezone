import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import '../styles/index.scss'

import Layout from "../components/layout"
import WedgeHighLow from "../components/svg/wedgeHighLow"
import WedgeLowHigh from "../components/svg/wedgeLowHigh"
import Schedule from "../components/svg/schedule"
import Coach from "../components/svg/coach"
import Player from "../components/svg/player"

export default ({ location }) => {
    const data = useStaticQuery(graphql`
        query IndexQuery {
            hero: file(sourceInstanceName: {eq: "hero"}) {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
            }
        }
    `)

    return (
        <Layout location={location} cssPageName="home">
            <Image
                className="hero-image"
                fluid={data.hero.childImageSharp.fluid}
                alt="Hero image."
            />

            <section className="panels">
                <WedgeHighLow className="background-svg" />
                <Link className="schedule" to="/schedule">
                    <Schedule />
                    <p>Schedule</p>
                </Link>
                <Link className="coaches" to="/coaches">
                    <Coach />
                    Coaches
                    </Link>
                <Link className="players" to="/players">
                    <Player />
                    Players
                    </Link>
            </section>

            <section className="team-proposition">
                <p>New York Knights Baseball Academy is all about one thing: player development. Our players will  grow as men, players, and winners in their time as a Knight.</p>
            </section>

            <section className="testimonial-container">
                <WedgeLowHigh className="background-svg" />
                <img className="avatar" src="/media/avatar.png" alt="Avatar." />
                <span className="quotation-mark open">"</span>
                <p className="quotation">My son learned so much from his coaches in such a small amount of time!</p>
                <span className="quotation-mark close">"</span>
                <p className="attribution">- Tommy Testimonial</p>
            </section>

        </Layout>
    )
}