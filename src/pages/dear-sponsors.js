import React, { useState, useEffect  } from "react"
import '../styles/dear-players.scss'
import { useForm, useFieldArray } from 'react-hook-form'

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
    const { register, control, reset, watch, errors, handleSubmit } = useForm({
        defaultValues: {
            teams: ["Any of them!",
            "Arizona Diamondbacks",
            "Atlanta Braves",
            "Baltimore Orioles",
            "Boston Red Sox",
            "Chicago Cubs",
            "Chicago White Sox",
            "Cincinnati Reds",
            "Cleveland Indians",
            "Colorado Rockies",
            "Detroit Tigers",
            "Houston Astros",
            "Kansas City Royals",
            "Los Angeles Angels",
            "Los Angeles Dodgers",
            "Miami Marlins",
            "Milwaukee Brewers",
            "Minnesota Twins",
            "New York Mets",
            "New York Yankees",
            "Oakland Athletics",
            "Philadelphia Phillies",
            "Pittsburgh Pirates",
            "San Diego Padres",
            "San Francisco Giants",
            "Seattle Mariners",
            "St. Louis Cardinals",
            "Tampa Bay Rays",
            "Texas Rangers",
            "Toronto Blue Jays",
            "Washington Nationals"
            ]
        }
    })

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

    const { fields } = useFieldArray({
        control,
        name: "teams"
    })

    	useEffect(() => {
            reset()
        }, [reset])

    return (
        <>
        {/* <div className="obligations">
        Obligations.
    </div> */}
    <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sponsor Sign Up Form</h1>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" ref={register({ required: true, maxLength: 80 })} style={errors.firstName ? { borderColor: '#CC0001' } : null} />
        {errors.firstName && <p className="error">First Name required.</p>}
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" ref={register({ required: true, maxLength: 100 })} style={errors.lastName ? { borderColor: '#CC0001' } : null} />
        {errors.lastName && <p className="error">Last Name required.</p>}
        <label htmlFor="email">Email</label>
        <input type="text" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} style={errors.email ? { borderColor: '#CC0001' } : null} />
        {errors.email && <p className="error">Valid email required.</p>}
        <label htmlFor="phoneNumber">Phone Number</label>
        <input type="tel" name="phoneNumber" ref={register({ required: true, minLength: 10, maxLength: 10 })} style={errors.phoneNumber ? { borderColor: '#CC0001' } : null} />
        {errors.phoneNumber && <p className="error">10 Digit Phone Number required.</p>}
        <h2>Preferred Organizations</h2>
        {fields.map((elem, index) => (
            <div key={index} className="container-checkbox">
            <input className="checkbox" type="checkbox" value={elem.value} name={`teams[${index + 1}]`} ref={register} />
            <label htmlFor={`teams[${index}]`} className="checkbox-label">{elem.value}</label>
            </div>
        ))}
        {Object.values(watch()).filter((elem => elem === false)).length === 31 && <p className="error">You must select at least one organization.</p>}
        <input className="honeypot" name="honeypot" ref={register()} />

        <input type="submit" className="submit-button" />
    </form>
    </>
    )
}