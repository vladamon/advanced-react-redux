const express = require('express')
const http = require('http')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const router = require('./router')
const mongoose = require('mongoose')

// DB setup - make connection to the database
mongoose.connect(
  'mongodb+srv://vladamon:I0nlyD@t3M0d3l$@cluster0-qkbcg.mongodb.net/course-examples?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

// create App
const app = express()

// App setup
// lib for logging
app.use(morgan('combined'))
// any request that is comming is going be parsed as json
app.use(bodyParser.json({ type: '*/*' }))
// setup router to handle routes for this app
router(app)

// Server setup
const port = process.env.PORT || 3090

// create http server and pass requests to app
// passing app to the server basically wires up app to handle all request
// on an application level
const server = http.createServer(app)
server.listen(port)

console.log('Server is listening at the port ', port)
