const mongoose = require('../database/index');

const csvDataSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed
});

const CsvData = mongoose.model('CsvData', csvDataSchema);

module.exports = CsvData;