const express = require('express')
const serverless = require('serverless-http')
const bodyParser = require('body-parser')

const app = express()
const router = express.Router()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// API calls
router.get('/hola', (req, res) => {
    res.send({ msg: 'Hello from a backend server' })
})

app.use('/api', router)

module.exports = app
module.exports.handler = serverless(app)