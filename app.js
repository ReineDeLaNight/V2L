const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const app = express();

app.use(cors({
    origin: "http://localhost:8080",
    credentials: true        
}))



app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const router = require('./router.js')

app.use('/api/', router)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'))

    app.get(/.*/, (req, res) => res.sendFile(__dirname + 'public/index.html'))
}

module.exports = {app}