import React, { useState, useRef } from 'react'
import { useForm } from "react-hook-form"

import '../styles/contact-form.scss'

import Checkmark from "../components/checkmark"

export default ({ ...props }) => {
    const [success, setSuccess] = useState(false)
    const [formHeight, setFormHeight] = useState(0)

    return (
        <div className="container-container" style={{ height: formHeight !== 0 ? formHeight : null }}>
            {success ? <SuccessMessage /> : <Form setFormHeight={setFormHeight} setSuccess={setSuccess} />}
        </div>
    )
}

const SuccessMessage = () => (
    <>
        <Checkmark />
        <p className="success-text">We've got the sign and we'll get back to you with your pitch as quick as we can!</p>
    </>
)

const Form = ({ setFormHeight, setSuccess }) => {
    const { register, handleSubmit, errors } = useForm()
    const form = useRef()

    const onSubmit = (formData, e) => {
        if (formData.length > 0) return console.log("Hello, robot! :)")

        fetch("/.netlify/functions/api/contact-us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    form.current.classList.add("out")
                    setFormHeight(form.current.clientHeight)
                    setTimeout(() => { setSuccess(true) }, 500)
                }
            })
    }

    return (
        <form className="contact-form-container" onSubmit={handleSubmit(onSubmit)} ref={form}>
            <div className="contact-form-body">
                <label htmlFor="name">
                    Your Name
                <input className="form-input" type="text" aria-label="Name" name="name" ref={register({ required: true, })} />
                </label>
                <p className="error">{errors.name && "A name is required."}</p>

                <label htmlFor="email">
                    Your Email
                <input className="form-input" type="email" aria-label="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                </label>
                <p className="error">{errors.email && "A valid email is required."}</p>

                <label htmlFor="message">
                    Your Message
                <textarea className="form-input textarea" type="textarea" aria-label="Message" name="message" ref={register({ required: true, min: 1, })} />
                </label>
                <p className="error">{errors.message && "A message is required."}</p>

                <label htmlFor="honepot" className="honeypot">
                    <input className="form-input" type="text" aria-label="Honeypot" name="honeypot" ref={register} />
                </label>

                <button className="submit-button" type="submit">
                    Send
                </button>
            </div>
        </form>
    )
}