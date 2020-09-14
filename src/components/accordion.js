import React, { useState, useRef } from 'react'
import { useStaticQuery, graphql } from "gatsby"
import '../styles/components/accordion.scss'

import Arrow from "./svg/arrowRight"

export const Accordion = ({ children }) => {
    return (
        <div className="accordion-container">
            {children}
        </div>
    )
}

export const AccordionItem = ({ header, children }) => {
    const { colors } = useStaticQuery(graphql`{...Colors}`)

    const { primaryColor, secondaryColor, textColor } = colors.childContentJson

    const content = useRef(null)
    const [open, setOpen] = useState(false)

    const toggleVisibility = () => {
        const elem = content.current
        elem.classList.toggle("open")
        if (elem.style.maxHeight) {
            setOpen(false)
            elem.style.maxHeight = null
        } else {
            setOpen(true)
            elem.style.maxHeight = elem.scrollHeight + 48 + "px"
        }
    }

    return (
        <div className="accordion-item">
            <button
                className="header-button"
                onClick={toggleVisibility}
                tabIndex={0}
                style={{ border: `2px solid ${secondaryColor}`, backgroundColor: primaryColor, color: textColor, borderBottomLeftRadius: open && "0", borderBottomRightRadius: open && "0" }}
            >
                <h2>{header}</h2>
                <Arrow fill={textColor} style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }} />
            </button>
            <div className="content" ref={content} style={open ? { border: `2px solid ${secondaryColor}`, borderTop: "none", opacity: 1 } : {}}>
                {children}
            </div>
        </div>
    )
}