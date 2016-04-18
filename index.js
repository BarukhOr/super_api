// Main starting point of the application
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const app = express()
const router = require('./router')
const mongoose = require('mongoose')

// DB Setup
mongoose.connect('mongodb://localhost/auth')

// App Setup
app.use(morgan('combined'))
router(app)

// Server Setup
const port = process.env.PORT || 3090
const server = http.createServer(app)
server.listen(port)
console.log('Server listening on:', port)