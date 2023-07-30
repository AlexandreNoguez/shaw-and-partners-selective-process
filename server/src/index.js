require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()

const csvRoutes = require('./routes/csvRoutes')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const port = process.env.PORT || 3333

// Routes
app.use('/api', csvRoutes)

app.listen(port, () => {
  console.log("Server started at", new Date().toLocaleString())
})

module.exports = app