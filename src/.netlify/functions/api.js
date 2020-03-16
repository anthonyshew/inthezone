require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const sendGrid = require('@sendgrid/mail')

const app = express()
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
sendGrid.setApiKey(process.env.SENDGRID_API_KEY)

// API calls
router.get('/hola', (req, res) => {
    res.send({ msg: 'Hello from a backend server' })
})

router.post('/mail', (req, res) => {
    const emailMessage = {
        to: process.env.AGENCY_EMAIL,
        from: process.env.CLIENT_EMAIL,
        subject: 'Message from MMSI!',
        html: `<h1>It worked!</h1>
    <p>A message.</p>
    `,
    }

    sendGrid.send(emailMessage)

    res.send({
        statusCode: 200,
        success: true,
        errors: [],
        data: null
    })
})

if (process.env.ENVIRONMENT !== 'PRODUCTION') {
    app.use('/api', router)
} else {
    app.use('/.netlify/functions/api', router)
}


module.exports = app
module.exports.handler = serverless(app)