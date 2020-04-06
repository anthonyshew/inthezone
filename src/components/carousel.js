import React, { useState } from 'react'
import '../styles/carousel.scss'
import { useStaticQuery, graphql } from 'gatsby'

import Image from 'gatsby-image'

const textContent = {
  english: {
    buttons: {
      prev: "Previous",
      next: "Next"
    },
    step: {
      one: {
        label: "Step 1",
        text: "A player gets in touch with us that he would like to be sponsored."
      },
      two: {
        label: "Step 2",
        text: "We let our community know a player is up for sponsorship."
      },
      three: {
        label: "Step 3",
        text: "We select a sponsor from the community for the player."
      },
      four: {
        label: "Step 4",
        text: "We put player and sponsor into contact and their relationship grows."
      }
    }
  },
  spanish: {
    buttons: {
      prev: "Previo",
      next: "Proximo"
    },
    step: {
      one: {
        label: "Paso 1",
        text: "Un jugador se pone en contacto con nosotros que le gustaría ser patrocinado.",
      },
      two: {
        label: "Paso 2",
        text: "Le decimos a nuestra comunidad que un jugador está listo para ser patrocinado.",
      },
      three: {
        label: "Paso 3",
        text: "Seleccionamos un patrocinador de la comunidad para el jugador.",
      },
      four: {
        label: "Paso 4",
        text: "Ponemos en contacto al jugador y al patrocinador y su relación crece.",
      }
    }
  }
}

export default ({ location }) => {
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
  const [language] = useState(location.pathname.startsWith("/es") ? textContent.spanish : textContent.english)

  return (
    <div className="carousel">
      <div className="slides-container" style={{ left: `-${step}00%` }}>
        <div className="slide one">
          <Image
            fluid={data.slideOne.childImageSharp.fluid}
            style={{ minHeight: "100%", minWidth: "100%", position: "absolute", bottom: 0 }}
          />
          <h3>{language.step.one.label}</h3>
          <p>{language.step.one.text}</p>
        </div>
        <div className="slide two">
          <Image
            fluid={data.slideTwo.childImageSharp.fluid}
            style={{ minHeight: "100%", minWidth: "100%", position: "absolute", bottom: 0 }}
          />
          <h3>{language.step.two.label}</h3>
          <p>{language.step.two.text}</p>
        </div>
        <div className="slide three">
          <Image
            fluid={data.slideThree.childImageSharp.fluid}
            style={{ minHeight: "100%", minWidth: "100%", position: "absolute", bottom: 0 }}
          />
          <h3>{language.step.three.label}</h3>
          <p>{language.step.three.text}</p>
        </div>
        <div className="slide four">
          <Image
            fluid={data.slideFour.childImageSharp.fluid}
            style={{ minHeight: "100%", minWidth: "100%", position: "absolute", top: 0, bottom: "50%" }}
          />
          <h3>{language.step.four.label}</h3>
          <p>{language.step.four.text}</p>
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