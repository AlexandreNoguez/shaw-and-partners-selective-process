const csv = require('csv-parser');
const fs = require('fs');
const CsvData = require('../models/csvModel');

exports.csvService = (req, res) => {
  try {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', async () => {
        fs.unlinkSync(req.file.path);

        const documentsToSave = results.map((item) => {
          return {
            data: item
          };
        });

        try {
          const savedData = await CsvData.insertMany(documentsToSave);
          return res.status(201).send(savedData);
        } catch (error) {
          console.error('Error saving data:', error);
          return res.status(500).send('Internal error saving data.');
        }
      });

  } catch (error) {
    console.error('Error reading file:', error);
    return res.status(500).send('Internal error reading file.');
  }
}

exports.csvReadService = async (req, res) => {

  console.log(req.query);
  const { page = 1, limit = 10 } = req.query;

  try {
    const nameQueryParam = req.query.name;

    if (nameQueryParam) {
      const items = await CsvData.find({ name: nameQueryParam })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()
      return res.status(200).json(items);
    } else {
      const allItems = await CsvData.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec()
      return res.status(200).json(allItems);
    }

  } catch (error) {
    // console.error('Error finding items:', error);
    return res.status(500).send('Internal error.');
  }
}
