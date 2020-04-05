import React, { useState } from 'react'
import '../styles/carousel.scss'
import { useStaticQuery, graphql } from 'gatsby'

import Image from 'gatsby-image'

export default ({ ...props }) => {
  const data = useStaticQuery(graphql`
    query CarouselQuery {
      slideOne: file(absolutePath: { regex: "/player-walking.jpg/" }) {
        childImageSharp {
          fluid(maxWidth: 1500) {
            ...GatsbyImageSharpFluid_noBase64
          }
        }
      }
    slideTwo: file(absolutePath: { regex: "/stadium.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1500) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
    slideThree: file(absolutePath: { regex: "/ball-on-grass.jpg/" }) {
      childImageSharp {
        fluid(maxWidth: 1500) {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }

  slideFour: file(absolutePath: { regex: "/gift.jpg/" }) {
    childImageSharp {
      fluid(maxWidth: 1500) {
        ...GatsbyImageSharpFluid_noBase64
      }
    }
  }
}
  `)

  const [step, setStep] = useState(0)

  return (
    <div className="carousel">
      <div className="slides-container" style={{ left: `-${step}00%` }}>
        <div className="slide one">
          <Image
            fluid={data.slideOne.childImageSharp.fluid}
            style={{ minHeight: "100%", minWidth: "100%", position: "absolute", bottom: 0 }}
          />
          <h3>Step 1</h3>
          <p>A player gets in touch with us that he would like to be sponsored.</p>
        </div>
        <div className="slide two">
          <Image
            fluid={data.slideTwo.childImageSharp.fluid}
            style={{ minHeight: "100%", minWidth: "100%", position: "absolute", bottom: 0 }}
          />
          <h3>Step 2</h3>
          <p>We let our community know a player is up for sponsorship.</p>
        </div>
        <div className="slide three">
          <Image
            fluid={data.slideThree.childImageSharp.fluid}
            style={{ minHeight: "100%", minWidth: "100%", position: "absolute", bottom: 0 }}
          />
          <h3>Step 3</h3>
          <p>We select a sponsor from the community for the player.</p>
        </div>
        <div className="slide four">
          <Image
            fluid={data.slideFour.childImageSharp.fluid}
            style={{ minHeight: "100%", minWidth: "100%", position: "absolute", top: 0, bottom: "50%" }}
          />
          <h3>Step 4</h3>
          <p>We put player and sponsor into contact and their relationship grows.</p>
        </div>
      </div>
      <button
        className="button-default step-button previous"
        onClick={() => {
          if (step < 1) { return } else {
            setStep(step - 1)
          }
        }}
      >
        Previous
            </button>
      <button
        className="button-default step-button next"
        onClick={() => {
          if (step > 2) { return } else {
            setStep(step + 1)
          }
        }}
      >
        Next
            </button>
    </div >
  )
}