require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const sendGrid = require('@sendgrid/mail')

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

router.post('/player-registration', (req, res) => {
    const { firstName, lastName, organization, email, phoneNumber } = req.body

    const emailMessage = {
        to: [process.env.EMAIL_TO, process.env.EMAIL_AGENCY],
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
        to: [process.env.EMAIL_TO, process.env.EMAIL_AGENCY],
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

if (process.env.ENVIRONMENT !== 'PRODUCTION') {
    app.use('/api', router)
} else {
    app.use('/.netlify/functions/api', router)
}


module.exports = app
module.exports.handler = serverless(app)