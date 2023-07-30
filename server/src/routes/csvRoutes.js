const express = require('express')
const routes = express.Router()
const multer = require('multer')

const multerConfig = multer({ dest: "uploads/" })

const {
  postFileCsv,
  readFileCsv
} = require('../controllers/csvController')

routes.post('/file', multerConfig.single('csvFile'), postFileCsv)
routes.get('/users', readFileCsv)

module.exports = routes