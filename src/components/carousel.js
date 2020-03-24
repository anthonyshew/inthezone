import React, { useState, useEffect } from 'react'
import '../styles/carousel.scss'

export default ({ ...props }) => {
    const [step, setStep] = useState(1)

    useEffect(() => {
        console.log(step)
    }, [])

    return (
        <div className="carousel">
            <button className="step-button previous">Previous</button>
            <button className="step-button next">Next</button>
        </div>
    )
}