import React, { useState, useEffect } from 'react'
import '../styles/carousel.scss'
import { useStaticQuery, graphql } from 'gatsby'

import BackgroundImage from 'gatsby-background-image'

export default ({ ...props }) => {
    const data = useStaticQuery(graphql`
        query ImageSlides {
            slideOne: file(absolutePath: { regex: "/player-walking.png/" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              slideTwo: file(absolutePath: { regex: "/stadium.jpg/" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              slideThree: file(absolutePath: { regex: "/ball-on-grass.png/" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              slideFour: file(absolutePath: { regex: "/gift.jpg/" }) {
                childImageSharp {
                  fluid(maxWidth: 2000) {
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
                    className="slide"
                    fluid={data.slideOne.childImageSharp.fluid}
                >
                    <p>StepOne.</p>
                </BackgroundImage>
                <BackgroundImage
                    Tag="div"
                    className="slide"
                    fluid={data.slideTwo.childImageSharp.fluid}
                >
                    <p>StepTwo.</p>
                </BackgroundImage>
                <BackgroundImage
                    Tag="div"
                    className="slide"
                    fluid={data.slideThree.childImageSharp.fluid}
                >
                    <p>StepThree.</p>
                </BackgroundImage>
                <BackgroundImage
                    Tag="div"
                    className="slide"
                    fluid={data.slideFour.childImageSharp.fluid}
                >
                    <p>StepFour.</p>
                </BackgroundImage>
            </div>
            <button
                className="step-button previous"
                onClick={() => {
                    if (step < 1) { return } else {
                        setStep(step - 1)
                    }
                }}
            >
                Previous
            </button>
            <button
                className="step-button next"
                onClick={() => {
                    if (step > 3) { return } else {
                        setStep(step + 1)
                    }
                }}
            >
                Next
            </button>
        </div >
    )
}