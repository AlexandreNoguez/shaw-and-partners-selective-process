
const { csvService, csvReadService } = require('../services/csvService')

exports.postFileCsv = async (req, res) => {
  csvService(req, res)
};
exports.readFileCsv = async (req, res) => {
  csvReadService(req, res)
}