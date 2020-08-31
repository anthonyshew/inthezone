import React, { useState, useRef } from 'react'
import "../../styles/comero/signup.scss"
import { useForm } from 'react-hook-form'

import { useAnimateOnVisible } from "../../hooks/useAnimateOnVisible"

import Spinner from './svg/spinner'
import Checkmark from './svg/checkmark'

export default ({ ...props }) => {
    const [formPending, setFormPending] = useState(false)
    const [backendError, setBackendError] = useState(false)
    const [formSuccess, setFormSuccess] = useState(false)
    const { register, handleSubmit, errors, reset } = useForm()

    const form = useRef(null)
    useAnimateOnVisible({ element: form })

    const onSubmit = (data) => {
        setFormPending(true)
        if (data.honeypot.length > 0) return console.log('Hello, robot!')
        fetch("/.netlify/functions/api/comero-contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: data.email })
        })
            .then(res => res.json())
            .then(res => {
                if (res.success) {
                    setFormPending(false)
                    setFormSuccess(true)
                    reset()
                } else {
                    setFormPending(false)
                    setBackendError(true)
                }
            })
    }

    return (
        <form className="email-signup" onSubmit={handleSubmit(onSubmit)} ref={form}>
            <input
                type="text"
                name="email"
                className="email"
                placeholder={formSuccess ? "Sent!" : "Send us your email to get started."}
                disabled={formSuccess}
                ref={register({ required: true, pattern: /[a-z0-9]+([-+._][a-z0-9]+){0,2}@.*?(\.(a(?:[cdefgilmnoqrstuwxz]|ero|(?:rp|si)a)|b(?:[abdefghijmnorstvwyz]iz)|c(?:[acdfghiklmnoruvxyz]|at|o(?:m|op))|d[ejkmoz]|e(?:[ceghrstu]|du)|f[ijkmor]|g(?:[abdefghilmnpqrstuwy]|ov)|h[kmnrtu]|i(?:[delmnoqrst]|n(?:fo|t))|j(?:[emop]|obs)|k[eghimnprwyz]|l[abcikrstuvy]|m(?:[acdeghklmnopqrstuvwxyz]|il|obi|useum)|n(?:[acefgilopruz]|ame|et)|o(?:m|rg)|p(?:[aefghklmnrstwy]|ro)|qa|r[eosuw]|s[abcdeghijklmnortuvyz]|t(?:[cdfghjklmnoprtvwz]|(?:rav)?el)|u[agkmsyz]|v[aceginu]|w[fs]|y[etu]|z[amw])\b){1,2}/ })}
            />
            <input
                type="text"
                name="honeypot"
                className="honeypot"
                ref={register}
            />
            <button
                type="submit"
                className={`submit${formSuccess ? " success" : ""}`}
            >
                {formSuccess ? <Checkmark /> : formPending ? <Spinner /> : "Send"}
            </button>
            {backendError ? <p className="error">Something went wrong on our end.</p> : errors.email ? <p className="error">Please enter a valid email address.</p> : <p className="error-placeholder"></p>}
        </form>
    )
}