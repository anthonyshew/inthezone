import React, { useState } from "react"
import '../styles/dear-sponsors.scss'
import { useForm } from 'react-hook-form'

import Layout from "../components/layout"

export default ({ location }) => {
    const [success, setSuccess] = useState(false)

    return (
        <Layout location={location}>
            <div className="page-dear-players">
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
        fetch("/.netlify/functions/api/player-registration", {
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
        <h1>Player Sign Up Form</h1>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" ref={register({ required: true, maxLength: 80 })} style={errors.firstName ? { borderColor: '#CC0001' } : null} />
        {errors.firstName && <p className="error">First Name required.</p>}
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" ref={register({ required: true, maxLength: 100 })} style={errors.lastName ? { borderColor: '#CC0001' } : null} />
        {errors.lastName && <p className="error">Last Name required.</p>}
        <label htmlFor="organization">Organization</label>
        <select name="organization" ref={register({ required: true, minLength: 5 })} style={errors.organization ? { borderColor: '#CC0001' } : null}>
            <option></option>
            <option value="Arizona Diamondbacks">Arizona Diamondbacks</option>
            <option value="Atlanta Braves">Atlanta Braves</option>
            <option value="Baltimore Orioles">Baltimore Orioles</option>
            <option value="Boston Red Sox">Boston Red Sox</option>
            <option value="Chicago Cubs">Chicago Cubs</option>
            <option value="Chicago White Sox">Chicago White Sox</option>
            <option value="Cincinnati Reds">Cincinnati Reds</option>
            <option value="Cleveland Indians">Cleveland Indians</option>
            <option value="Colorado Rockies">Colorado Rockies</option>
            <option value="Detroit Tigers">Detroit Tigers</option>
            <option value="Houston Astros">Houston Astros</option>
            <option value="Kansas City Royals">Kansas City Royals</option>
            <option value="Los Angeles Angels">Los Angeles Angels</option>
            <option value="Los Angeles Dodgers">Los Angeles Dodgers</option>
            <option value="Miami Marlins">Miami Marlins</option>
            <option value="Milwaukee Brewers">Milwaukee Brewers</option>
            <option value="Minnesota Twins">Minnesota Twins</option>
            <option value="New York Mets">New York Mets</option>
            <option value="New York Yankees">New York Yankees</option>
            <option value="Oakland Athletics">Oakland Athletics</option>
            <option value="Philadelphia Phillies">Philadelphia Phillies</option>
            <option value="Pittsburgh Pirates">Pittsburgh Pirates</option>
            <option value="San Diego Padres">San Diego Padres</option>
            <option value="San Francisco Giants">San Francisco Giants</option>
            <option value="Seattle Mariners">Seattle Mariners</option>
            <option value="St. Louis Cardinals">St. Louis Cardinals</option>
            <option value="Tampa Bay Rays">Tampa Bay Rays</option>
            <option value="Texas Rangers">Texas Rangers</option>
            <option value="Toronto Blue Jays">Toronto Blue Jays</option>
            <option value="Washington Nationals">Washington Nationals</option>
        </select>
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