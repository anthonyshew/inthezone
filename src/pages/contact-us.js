import React, { useState } from "react"
import '../styles/contact.scss'
import { useForm } from 'react-hook-form'

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data, location }) => {
    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
            <SEO title="Contact Us" >
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Contact Adopt a Minor Leaguer" />
            </SEO>
            <div className="page-contact">
                <h1>Contact Us</h1>
                {success ? <SuccessMessage /> : <ContactForm setSuccess={setSuccess} />}
            </div>
        </Layout>
    )
}

const SuccessMessage = () => <p className="success-message">Thank you for getting in touch with us. You'll be hearing from us shortly (usually within the next 48 hours).</p>

const ContactForm = ({ setSuccess }) => {
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = (formData, e) => {
        fetch("/.netlify/functions/api/contact-us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => setSuccess(true))
    }
    return (
        <>
            <p>If you'd like to get in touch with us, please use this form below to send us an email.</p>
            <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">
                    Name
                <input className="form-input" type="text" name="name" ref={register({ required: true, })} />
                </label>
                {errors.name && <p className="error">A name is required.</p>}

                <label htmlFor="email">
                    Your Email
                <input className="form-input" type="email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                </label>
                {errors.email && <p className="error">A valid email is required.</p>}

                <label htmlFor="message">
                    Your Message
                <textarea className="form-input" type="textarea" name="message" ref={register({ required: true, min: 1, })} />
                </label>
                {errors.message && <p className="error">A message is required.</p>}

                <button className="submit-button" type="submit">
                    Send
                </button>
            </form>
        </>
    )
}
