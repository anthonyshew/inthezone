import React, { useState } from 'react'
import '../styles/carousel.scss'

export default ({ ...props }) => {
  const [step, setStep] = useState(0)

  return (
    <div className="carousel">
      <div className="slides-container" style={{ left: `-${step}00%` }}>
        <div className="slide one">
          <h3>Step 1</h3>
          <p>A player gets in touch with us that he would like to be sponsored.</p>
        </div>
        <div className="slide two">
          <h3>Step 2</h3>
          <p>We let our community know a player is up for sponsorship.</p>
        </div>
        <div className="slide three">
          <h3>Step 3</h3>
          <p>We select a sponsor from the community for the player.</p>
        </div>
        <div className="slide four">
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