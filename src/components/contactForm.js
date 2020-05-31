import React, { useState, useRef } from 'react'
import { useForm } from "react-hook-form"
import '../styles/contact-form.scss'

export default ({ ...props }) => {
    const { register, handleSubmit, errors } = useForm()
    const [success, setSuccess] = useState(false)
    const form = useRef()

    const onSubmit = (formData, e) => {
        fetch("/.netlify/functions/api/contact-us", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
            .then(res => {
                form.current.classList.add("out")
                setTimeout(() => { setSuccess(true) }, 1000)
            })
    }
    return (
        <>
            <form className="contact-form-body" onSubmit={handleSubmit(onSubmit)} ref={form}>
                <label htmlFor="name">
                    Name
                <input className="form-input" type="text" aria-label="Name" name="name" ref={register({ required: true, })} />
                </label>
                {errors.name && <p className="error">A name is required.</p>}

                <label htmlFor="email">
                    Your Email
                <input className="form-input" type="email" aria-label="Email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
                </label>
                {errors.email && <p className="error">A valid email is required.</p>}

                <label htmlFor="message">
                    Your Message
                <textarea className="form-input" type="textarea" aria-label="Message" name="message" ref={register({ required: true, min: 1, })} />
                </label>
                {errors.message && <p className="error">A message is required.</p>}

                <button className="submit-button" type="submit">
                    Send
                </button>
            </form>
        </>
    )
}