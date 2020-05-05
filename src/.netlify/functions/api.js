require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const sendGrid = require('@sendgrid/mail')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

router.post('/player-registration', (req, res) => {
    const { firstName, lastName, organization, email, phoneNumber } = req.body

    const emailMessage = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: `New Player Sign Up!: ${firstName} ${lastName}`,
        html: `<h1>A new player has signed up for sponsorship.</h1>
    <div><h2>First Name: </h2><span>${firstName}</span><div>
    <div><h2>Last Name: </h2><span>${lastName}</span><div>
    <div><h2>Organization: </h2><span>${organization}</span><div>
    <div><h2>E-mail: </h2><span>${email}</span><div>
    <div><h2>Phone Number: </h2><span>${phoneNumber}</span><div>
    `,
    }

    sendGrid.send(emailMessage)
        .then(response => res.send({
            statusCode: 200,
            success: true,
            errors: [],
            data: firstName
        }))
        .catch(err => res.send(err))
})

router.post('/sponsor-registration', (req, res) => {
    const { firstName, lastName, teams, email, phoneNumber } = req.body

    let teamString = teams.filter(elem => elem !== false).join(", ")

    const emailMessage = {
        to: process.env.EMAIL_TO,
        from: email,
        subject: `New Sponsor Sign Up!: ${firstName} ${lastName}`,
        html: `<h1>A new sponsor has signed up for sponsorship.</h1>
    <div><h2>First Name: </h2><span>${firstName}</span><div>
    <div><h2>Last Name: </h2><span>${lastName}</span><div>
    <div><h2>Organizations of Interest: </h2><span>${teamString}</span><div>
    <div><h2>E-mail: </h2><span>${email}</span><div>
    <div><h2>Phone Number: </h2><span>${phoneNumber}</span><div>
    `,
    }

    sendGrid.send(emailMessage)
        .then(response => res.send({
            statusCode: 200,
            success: true,
            errors: [],
            data: firstName
        }))
        .catch(err => res.send(err))
})

router.post('/donate', async (req, res) => {
    const clientSecret = await stripe.paymentIntents.create({
        amount: req.body.donationAmount * 100,
        currency: "usd"
    }).catch(err => console.log(err))

    res.send(clientSecret)
})

router.post('/donate-success', (req, res) => {
    const { email, amount } = req.body

    const emailMessage = {
        to: [process.env.EMAIL_TO, email],
        from: process.env.EMAIL_FROM,
        replyTo: email,
        subject: `Adopt a Minor Leaguer Thanks You for Your Donation`,
        html: `<h1>Your donation is helping minor leaguers today.</h1>
    <div><p>Your contribution helps us to help minor leaguers. We appreciate the support that you have shown players as they chase their dreams.</p><div>
    <div><p>This email acts as a valid receipt for proof of your tax deductible contribution to a 501(3)(c). Please save it for your records and tax filings.</p><div>
    <br />
    <div><h2>Name of Organization: </h2><span>Adopt a Minor Leaguer</span><div>
    <div><h2>Amount of Cash Contribution:</h2><span>$${amount}</span><div>
    <br />
    <div><small>There were no non-cash contributions donated in conjunction with this cash donation.</small><div>
    <div><small>No goods or services were provided in return for this gracious contribution.</small><div>
    `,
    }

    sendGrid.send(emailMessage)
        .then(response => res.send({
            statusCode: 200,
            success: true,
            errors: [],
            data: {}
        }))
        .catch(err => res.send(err))
})

router.post('/contact-us', (req, res) => {
    const { name, email, message } = req.body

    const emailMessage = {
        to: process.env.EMAIL_CONTACT,
        from: email,
        subject: `New Message from Website Contact Form`,
        html: `<h1>${name} has sent Adopt a Minor Leaguer a message!</h1>
    <div><h2>Their message is:</h2><div>
    <div><p>${message}</p><div>
    <br />
    <div><p>Responding to this email will send your email back to the sender.</p><div>
    `,
    }

    sendGrid.send(emailMessage)
        .then(response => res.send({
            statusCode: 200,
            success: true,
            errors: [],
            data: {}
        }))
        .catch(err => res.send(err))
})

if (process.env.ENVIRONMENT !== 'PRODUCTION') {
    app.use('/api', router)
} else {
    app.use('/.netlify/functions/api', router)
}


module.exports = app
module.exports.handler = serverless(app)