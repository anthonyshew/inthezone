import React, { useState } from "react"
import { useStaticQuery, graphql } from 'gatsby'
import '../styles/contact.scss'
import { useForm } from 'react-hook-form'

import Layout from "../components/layout"

export default ({ location }) => {
    const { colors } = useStaticQuery(graphql`
query ContactForm {
    colors: file(sourceInstanceName: {eq: "colors"}) {
        childContentJson {
          secondaryColor
          primaryColor
          textColor
        }
      }
}
    `
    )

    const { primaryColor, secondaryColor, textColor } = colors.childContentJson

    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
            <div className="page-contact">
                <h1 style={{ color: secondaryColor }}>Contact Us</h1>
                {success ? <SuccessMessage primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} /> : <ContactForm setSuccess={setSuccess} primaryColor={primaryColor} secondaryColor={secondaryColor} textColor={textColor} />}
            </div>
        </Layout>
    )
}

const SuccessMessage = () => <p className="success-message">Thank you for getting in touch with us. You'll be hearing from us shortly (usually within the next 48 hours).</p>




const ContactForm = ({ setSuccess, primaryColor, secondaryColor, textColor }) => {
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = (formData, e) => {
        fetch("/.netlify/functions/api / contact - us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => setSuccess(true))
    }

    const inputStyles = {
        border: `2px solid ${secondaryColor}`
    }

    const labelStyles = {
        color: `${primaryColor}`
    }

    return (
        <>
            <p style={{ color: primaryColor }}>If you'd like to get in touch with us, please use this form below to send us an email.</p>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name" style={labelStyles}>
                    Name
                <input className="form-input" style={inputStyles} type="text" name="name" ref={register({ required: true, })} />
                </label>
                {errors.name && <p className="error">A name is required.</p>}

                <label htmlFor="email" style={labelStyles}>
                    Your Email
                <input className="form-input" style={inputStyles} type="email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                </label>
                {errors.email && <p className="error">A valid email is required.</p>}

                <label htmlFor="message" style={labelStyles}>
                    Your Message
                <textarea className="form-input" style={inputStyles} type="textarea" name="message" ref={register({ required: true, min: 1, })} />
                </label>
                {errors.message && <p className="error">A message is required.</p>}

                <button className="submit-button" type="submit" style={{ border: `2px solid ${primaryColor}`, color: textColor, backgroundColor: secondaryColor }}>
                    Send
                </button>
            </form>
        </>
    )
}
