const express = require('express')
const routes = express.Router()
const multer = require('multer')

const multerConfig = multer({ dest: "uploads/" })

const {
  readCsv
} = require('../controllers/csvController')

routes.post('/file', multerConfig.single('csvFile'), readCsv)

module.exports = routes