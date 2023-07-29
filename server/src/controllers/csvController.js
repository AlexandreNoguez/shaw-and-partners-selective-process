const csv = require('csv-parser');
const fs = require('fs');
const CsvData = require('../models/csvModel');

exports.readCsv = async (req, res) => {
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
};
