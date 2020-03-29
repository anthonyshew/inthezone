import React, { useState } from "react"
import '../styles/dear-players.scss'
import { useForm } from 'react-hook-form'

import Layout from "../components/layout"

export default ({ location }) => {
    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
            <div className="page-dear-sponsors">
            {success ? <SuccessMessage  /> : <SignUpForm setSuccess={setSuccess} />}
            </div>
        </Layout>
    )
}

const SuccessMessage = () => (
    <p>Thank you for signing up! You'll be hearing from us shortly (usually within the next 24 hours).</p>
)

const SignUpForm = ({setSuccess}) => {
    const { register, errors, handleSubmit } = useForm()
    const onSubmit = data => {
        if (data.honeypot.length > 0) return console.log('Hello, robot!')
        fetch("/.netlify/functions/api/sponsor-registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => setSuccess(true))
    }

    return (
        <>
        <div className="obligations">
        Obligations.
    </div>
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sponsor Sign Up Form</h1>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" ref={register({ required: true, maxLength: 80 })} style={errors.firstName ? { borderColor: '#CC0001' } : null} />
        {errors.firstName && <p className="error">First Name required.</p>}
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" ref={register({ required: true, maxLength: 100 })} style={errors.lastName ? { borderColor: '#CC0001' } : null} />
        {errors.lastName && <p className="error">Last Name required.</p>}
        <h2>Organizations You Want<br />a Player From Most</h2>
        <div className="container-checkbox">
        <input className="checkbox" type="checkbox" placeholder="organizations" name="organizations[1]" ref={register} />
        <label htmlFor="organizations" className="checkbox-label">Arizona Diamondbacks</label>
        </div>
        {errors.organization && <p className="error">Organization required.</p>}
        <label htmlFor="email">Email</label>
        <input type="text" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} style={errors.email ? { borderColor: '#CC0001' } : null} />
        {errors.email && <p className="error">Valid email required.</p>}
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" name="phoneNumber" ref={register({ required: true, minLength: 10, maxLength: 10 })} style={errors.phoneNumber ? { borderColor: '#CC0001' } : null} />
        {errors.phoneNumber && <p className="error">10 Digit Phone Number required.</p>}
        <input className="honeypot" name="honeypot" ref={register()} />

        <input type="submit" className="submit-button" />
    </form>
    </>
    )
}