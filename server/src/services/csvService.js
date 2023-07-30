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
  const { page = 1, limit = 10, q } = req.query;

  try {
    let filter = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      // console.log("CsvData", CsvData);
      Object.keys(CsvData.schema.tree.data).map(col => console.log(col))
      filter = {
        'data.name': regex, // Acessar o campo corpus dentro de data
      };
    }
    // let filter = {};
    // if (q) {
    //   const regex = new RegExp(q, 'i');
    //   const dynamicColumns = Object.keys(CsvData.schema.tree.data);
    //   console.log("teste", { $or: dynamicColumns.map(column => ({ [`data.${column}`]: regex })) });
    //   // Criar o filtro dinamicamente com base nas colunas do objeto data
    //   filter = {
    //     $or: dynamicColumns.map(column => ({ [`data.${column}`]: regex })),
    //   };
    // }

    const items = await CsvData.find(filter)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    return res.status(200).json(items);

  } catch (error) {
    console.error('Error finding items:', error);
    return res.status(500).send('Internal error.');
  }
};






//ESSE CODIGO FUNCIONOU UNICAMENTE PRA CORPUS
// exports.csvReadService = async (req, res) => {
//   const { page = 1, limit = 10, q } = req.query;

//   try {
//     let filter = {};
//     if (q) {
//       const regex = new RegExp(q, 'i');
//       filter = {
//         'data.corpus': regex, // Acessar o campo corpus dentro de data
//       };
//     }

//     const items = await CsvData.find(filter)
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     return res.status(200).json(items);

//   } catch (error) {
//     console.error('Error finding items:', error);
//     return res.status(500).send('Internal error.');
//   }
// };


// exports.csvReadService = async (req, res) => {
//   const { page = 1, limit = 10, q } = req.query;
//   console.log("req.query", req.query);
//   try {
//     let filter = {};
//     if (q) {
//       const regex = new RegExp(q, 'i');
//       const dynamicColumns = Object.keys(CsvData.schema.tree);
//       filter = {
//         $or: dynamicColumns.map(column => {
//           if (column !== '_id' && column !== '__v') {
//             console.log("column", column);
//             console.log("data.${column}", `data.${column}`);
//             console.log("========");
//             console.log(regex)
//             return { [`data.${column}`]: regex };
//           }
//           return null;
//         }).filter(Boolean),
//       };
//     }

//     const items = await CsvData.find(filter)
//       .limit(limit * 1)
//       .skip((page - 1) * limit)
//       .exec();

//     return res.status(200).json(items);

//   } catch (error) {
//     console.error('Error finding items:', error);
//     return res.status(500).send('Internal error.');
//   }
// };

