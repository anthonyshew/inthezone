import React from 'react'
import '../styles/business-sponsors.scss'
import { useStaticQuery, graphql } from "gatsby"
import Image from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"

import useAnimateOnVisible from "../hooks/useAnimateOnVisible"

export default ({ location }) => {
    const data = useStaticQuery(graphql`
    query BusinessSponsors {
        orvilleAndrew: file(absolutePath: {regex: "/OA-icon.png/"}) {
            childImageSharp {
              fixed(width: 150) {
                ...GatsbyImageSharpFixed
              }
            }
          }
          backwoodPine: file(absolutePath: {regex: "/backwood-pine.jpg/"}) {
            childImageSharp {
              fixed(width: 175) {
                ...GatsbyImageSharpFixed
              }
            }
          }
    }
    `)

    const sponsors = [
        {
            name: "Orville Andrew",
            description: "Owned by St. Louis Cardinals farmhand Patrick Dayton and his brother, Glenn, Orville Andrew creates candles for all occassions. Their bountiful scents can add that extra ounce of cozy to your home or give your space at your office some character.",
            image: data.orvilleAndrew.childImageSharp.fixed,
            imageAlt: "",
            code: "BASEBALL",
            link: "https://orvilleandrew.com"
        },
        {
            name: "Backwood Pine",
            description: "Kyle Schmidt of the Minnesota Twins found a passion for photography during his years in college that has continued to this day. And he'll let his breathtaking photos be yours. USE THE CODE FOR A 25% DISCOUNT!",
            image: data.backwoodPine.childImageSharp.fixed,
            imageAlt: "",
            code: "adoptmilb",
            link: "https://backwoodpine.darkroom.tech/"
        },
    ]

    return (
        <Layout location={location}>
            <SEO title="Business Sponsors">
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Business Sponsors Page" />
            </SEO>

            <div className="page-business-sponsors">
                <h1>Our Business Sponsors</h1>
                <p className="subline">What's a business sponsor? The following is a list of business sponsors who have committed to donating to our cause. Whether it be a percentage of sales or a donation every time someones uses a code at checkout, these businesses are choosing to make a difference in the lives of minor leaguers. (And many of them are owned by minor leaguers!)</p>
                {sponsors.map((elem) => (
                    <Card
                        key={elem.name}
                        name={elem.name}
                        description={elem.description}
                        image={elem.image}
                        code={elem.code}
                        link={elem.link}
                    />
                ))}
            </div>

        </Layout>
    )
}

const Card = ({ name, description, image, imageAlt, code, link }) => (
    <section className="sponsor-card">
        <h2>{name}</h2>
        <div className="flex">
            <div className="img-container">
                <a href={link} target="_blank" rel="noopener noreferrer">
                    <Image className="sponsor-image" fixed={image} alt={imageAlt} />
                </a>
            </div>
            <div className="text-container">
                {code !== "" && <h3>USE CODE AT CHECKOUT: <span className="code">{code}</span></h3>}
                <p>{description}</p>
            </div>
        </div>
        <a className="card-link" href={link} target="_blank" rel="noopener noreferrer">Visit</a>
    </section>
)