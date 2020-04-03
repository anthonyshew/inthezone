import React, { useState } from 'react'
import '../styles/carousel.scss'
import { useStaticQuery, graphql } from 'gatsby'

import BackgroundImage from 'gatsby-background-image'

export default ({ ...props }) => {
  const data = useStaticQuery(graphql`
        query ImageSlides {
            slideOne: file(absolutePath: { regex: "/player-walking.png/" }) {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              slideTwo: file(absolutePath: { regex: "/stadium.jpg/" }) {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              slideThree: file(absolutePath: { regex: "/ball-on-grass.png/" }) {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              slideFour: file(absolutePath: { regex: "/gift.jpg/" }) {
                childImageSharp {
                  fluid(maxWidth: 1000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
        }`)

  const [step, setStep] = useState(0)

  return (
    <div className="carousel">
      <div className="slides-container" style={{ left: `-${step}00%` }}>
        <BackgroundImage
          Tag="div"
          className="slide one"
          fluid={data.slideOne.childImageSharp.fluid}
          loading="eager"
        >
          <h3>Step 1</h3>
          <p>A player gets in touch with us that he would like to be sponsored.</p>
        </BackgroundImage>
        <BackgroundImage
          Tag="div"
          className="slide two"
          fluid={data.slideTwo.childImageSharp.fluid}
          loading="eager"
        >
          <h3>Step 2</h3>
          <p>We let our community know a player is up for sponsorship.</p>
        </BackgroundImage>
        <BackgroundImage
          Tag="div"
          className="slide three"
          fluid={data.slideThree.childImageSharp.fluid}
          loading="eager"
        >
          <h3>Step 3</h3>
          <p>We select a sponsor from the community for the player.</p>
        </BackgroundImage>
        <BackgroundImage
          Tag="div"
          className="slide four"
          fluid={data.slideFour.childImageSharp.fluid}
          loading="eager"
        >
          <h3>Step 4</h3>
          <p>We put player and sponsor into contact and their relationship grows.</p>
        </BackgroundImage>
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