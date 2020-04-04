import React, { useState } from 'react'
import '../styles/donate.scss'
import { Elements, CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useForm } from 'react-hook-form'
import { loadStripe } from '@stripe/stripe-js'

import Layout from "../components/layout"
import SEO from "../components/seo"

const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const style = {
    style: {
        base: {
            fontFamily: '"Raleway", sans-serif',
            fontSize: "16px",
            color: "#00235B",
            fontWeight: 900,
            '::placeholder': {
                fontWeight: 400,
            }
        }
    }
}

export default ({ location }) => {
    return (
        <Layout location={location}>
            <SEO title="Donate">
                <meta name="og:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image" content="/media/aaml-logo.jpg" />
                <meta name="twitter:image:alt" content="Adopt a Minor Leaguer Donation Page" />
            </SEO>
            <div className="page-404">
                <h1>Donate Directly to Our Non-Profit</h1>
                <p>Pardon our dust! We're still under construction and don't quite have our donation channel prepared.</p>
                <p>We appreciate your enthusiasm for this cause and you'll be able to donate here in about one short week. We will keep you updated when this page comes online!</p>
            </div>
            {/* <div className="page-donate">
                <h1>Donate Directly to Our Non-Profit</h1>
                <StripeWrapper />
            </div> */}
        </Layout>
    )

}

const DonateForm = () => {
    const { register, handleSubmit, errors } = useForm()
    const stripe = useStripe()
    const elements = useElements()

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [stripeError, setStripeError] = useState("")

    const onSubmit = async (formData, e) => {
        e.preventDefault()
        setIsSubmitting(true)

        if (!stripe || !elements) return

        fetch("/.netlify/functions/api/donate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ donationAmount: formData.amount })
        })
            .then(res => res.json())
            .then(async (res) => {
                const { error } = await stripe.confirmCardPayment(res.client_secret, {
                    payment_method: {
                        card: elements.getElement(CardNumberElement),
                        billing_details: {
                            address: {
                                city: formData.city,
                                country: formData.country,
                                line1: formData.line1,
                                line2: formData.line2,
                                postal_code: formData.postal_code,
                                state: formData.state
                            }
                        }
                    }
                })

                if (error) {
                    setStripeError({ bool: true, message: error.message })
                    setIsSubmitting(false)
                } else {
                    fetch("/.netlify/functions/api/donate-success", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(formData)
                    })
                        .then(res => window.location.href = '/thank-you-for-donating')
                }
            })
    }

    return (
        <form className="donate-form" onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">
                Your Email
                <input className="form-input" type="email" name="email" ref={register({ required: true, pattern: /^\S+@\S+$/i })} />
            </label>
            {errors.amount && <p className="error">A valid email is required.</p>}
            <label htmlFor="amount" className="currency-container">
                Your Donation Amount
                <input className="form-input donation-amount" type="number" name="amount" ref={register({ required: true, min: 1, })} />
                <p className="currency">$</p>
            </label>
            {errors.amount && <p className="error">An amount greater than 1 is required.</p>}
            <label htmlFor="cardnumber">
                Card Number
                <CardNumberElement
                    className="form-input"
                    options={style}
                />
            </label>
            <label htmlFor="exp-date">
                Expiration Date
            <CardExpiryElement
                    className="form-input"
                    options={style}
                />
            </label>
            <label htmlFor="cvc">
                Security Code (CVC)
                <CardCvcElement
                    className="form-input"
                    options={style}
                />
            </label>
            {stripeError.bool && <p className="error">{stripeError.message}</p>}
            <button className="submit-button" type="submit" disabled={!stripe || isSubmitting}>
                {isSubmitting ? "Processing..." : "Donate"}
            </button>
        </form>
    )
}


const StripeWrapper = ({ key }) => (
    <Elements stripe={stripePromise} options={{ fonts: [{ cssSrc: "https://fonts.googleapis.com/css?family=Raleway&display=swap" }] }}>
        <DonateForm />
    </Elements >
)