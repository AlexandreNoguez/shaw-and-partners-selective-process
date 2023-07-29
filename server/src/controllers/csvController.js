const csv = require('csv-parser')
const fs = require('fs')
const CsvData = require('../models/csvModel'); // Importe o modelo que você definiu


exports.readCsv = async (req, res) => {
  try {
    // console.log("req.body", req.body);
    console.log("req.file.path", req.file);
    // console.log("req.file", req.file.buffer.toString("utf-8"));
    const results = [];
    console.log("results", results);
    fs.createReadStream(req.file.path) // Corrigido: passe req.file.path em vez de req.file
      .pipe(csv())
      .on('data', (row) => {
        results.push(row);
      })
      .on('end', () => {
        fs.unlinkSync(req.file.path); // Remove o arquivo temporário após a leitura

        console.log(results); // Aqui você pode fazer o que quiser com os dados do CSV

      });
    const documentsToSave = results.map((item) => {
      return {
        data: item
      };
    });

    // User.insertMany([
    //   { name: 'Gourav', age: 20 },
    //   { name: 'Kartik', age: 20 },
    //   { name: 'Niharika', age: 20 }
    // ]).then(function () {
    //   console.log("Data inserted")  // Success
    // }).catch(function (error) {
    //   console.log(error)      // Failure
    // });

    let inserData = await CsvData.insertMany(documentsToSave)
    res.json(inserData)
    // .then(function () {
    //   console.log("Data inserted")  // Success
    // }).catch(function (error) {
    //   console.log(error)      // Failure
    // });
    // console.error('Erro ao salvar dados:', err);


  } catch (error) {
    // res.status(500).send("Erro interno", error)
    console.error("Erro ao ler o arquvo", error);
  }
}