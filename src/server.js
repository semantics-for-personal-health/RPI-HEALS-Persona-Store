'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Constants
const PORT = process.env.PORT || 8080
const HOST = '0.0.0.0'

const { MONGO_URL, MONGO_DB } = process.env

const FULL_MONGO_URL = new URL(MONGO_DB, MONGO_URL).href

// App
const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

console.log(`Connecting to mongo at: ${FULL_MONGO_URL} ...`)
mongoose
  .connect(FULL_MONGO_URL, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('Successfully connected to mongo')
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
  })

const preloadPersonas = require('./preload-personas')
preloadPersonas()

// hello world route
app.get('/', (req, res) => {
  res.send('Hello World, I am a persona store')
})

// Import persona routes
const personaRoutes = require('./routes/persona.routes')
personaRoutes(app)

const server = app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}]`)
})

server.on('close', async () => {
  await mongoose.connection.close()
})

module.exports = server
