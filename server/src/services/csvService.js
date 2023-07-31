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
          // console.error('Error saving data:', error);
          return res.status(500).send('Internal error saving data.');
        }
      });

  } catch (error) {
    // console.error('Error reading file:', error);
    return res.status(500).send('Internal error reading file.');
  }
}

// function findPaths(obj, parentKey = '') {
//   let paths = [];
//   for (let key in obj) {
//     if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
//       paths.push(...findPaths(obj[key], parentKey + key + '.'));
//     } else {
//       paths.push(parentKey + key);
//     }
//   }
//   return paths;
// }

// exports.csvReadService = async (req, res) => {
//   const { page, limit, q } = req.query;

//   try {
//     /**FUNCAO FIXA FUNCIONANDO */
//     let filter = {};
//     if (q) {
//       const regex = new RegExp(q, 'i');
//       filter = {
//         'data.name': regex,
//       };
//     }

//     /**
//      * FUNCAO DINAMICA SEM FUNCIONAR
//      */
//     // if (q) {
//     //   const regex = new RegExp(q, 'i');
//     //   const dynamicColumns = Object.keys(CsvData.schema.paths);

//     //   // Criar o filtro dinamicamente com base nas colunas do objeto data
//     //   filter = {
//     //     $or: dynamicColumns.map(column => ({ [`data.${column}`]: regex })),
//     //   };
//     // }

//     const items = await CsvData.find(filter)
//       .limit(Number(limit))
//       .skip((Number(page) - 1) * Number(limit))
//       .exec();

//     return res.status(200).json(items);
//   } catch (error) {
//     // console.error('Error finding items:', error);
//     return res.status(500).send('Internal error.');
//   }
// };

// exports.csvReadService = async (req, res) => {
//   const { page, limit, q } = req.query;

//   try {
//     /**FUNCAO FIXA FUNCIONANDO */
//     let filter = {};
//     if (q) {
//       const regex = new RegExp(q, 'i');
//       filter = {
//         'data.name': regex,
//       };
//     }

//     /**
//      * FUNCAO DINAMICA SEM FUNCIONAR
//      */
//     // let filter = {};

//     // if (q) {
//     //   const regex = new RegExp(q, 'i');
//     //   const validColumns = Object.keys(CsvData.schema.paths).filter(column => column !== '_id' && column !== '__v');
//     //   filter = {
//     //     $or: validColumns.map(column => ({ [`data.${column}`]: regex })),
//     //   };
//     // }

//     const items = await CsvData.find(filter)
//       .limit(Number(limit))
//       .skip((Number(page) - 1) * Number(limit))
//       .exec();

//     return res.status(200).json(items);
//   } catch (error) {
//     console.error('Error finding items:', error);
//     return res.status(500).send('Internal error.');
//   }
// };

// FUNCIONOU COM ERRO NO PRIMEIRO RENDER
// exports.csvReadService = async (req, res) => {
//   const { page, limit, q } = req.query;

//   try {
//     const pipeline = [];

//     if (q) {
//       const regex = new RegExp(q, 'i');

//       // Convert the data field into an array of key-value pairs (objects)
//       const projectStage = {
//         $project: {
//           data: {
//             $objectToArray: '$data',
//           },
//         },
//       };

//       pipeline.push(projectStage);

//       // Build the $match stage to filter based on the provided query
//       const matchStage = {
//         $match: {
//           'data.v': regex,
//         },
//       };

//       pipeline.push(matchStage);
//     }

//     // Add $skip and $limit stages for pagination
//     const skipStage = {
//       $skip: (Number(page) - 1) * Number(limit),
//     };
//     const limitStage = {
//       $limit: Number(limit),
//     };

//     pipeline.push(skipStage, limitStage);

//     // Convert the data field back to the original format after filtering
//     const projectBackStage = {
//       $project: {
//         data: {
//           $arrayToObject: '$data',
//         },
//       },
//     };

//     pipeline.push(projectBackStage);

//     const items = await CsvData.aggregate(pipeline).exec();

//     return res.status(200).json(items);
//   } catch (error) {
//     console.error('Error finding items:', error);
//     return res.status(500).send('Internal error.');
//   }
// };

exports.csvReadService = async (req, res) => {
  const { page, limit, q } = req.query;

  try {
    const pipeline = [];

    if (q && q.trim() !== '') {
      const regex = new RegExp(q, 'i');

      // Convert the data field into an array of key-value pairs (objects)
      const projectStage = {
        $project: {
          data: {
            $objectToArray: '$data',
          },
        },
      };

      pipeline.push(projectStage);

      // Build the $match stage to filter based on the provided query
      const matchStage = {
        $match: {
          'data.v': regex,
        },
      };

      pipeline.push(matchStage);

      // Convert the data field back to the original format after filtering
      const projectBackStage = {
        $project: {
          data: {
            $arrayToObject: '$data',
          },
        },
      };

      pipeline.push(projectBackStage);
    }

    // Add $skip and $limit stages for pagination
    const skipStage = {
      $skip: (Number(page) - 1) * Number(limit),
    };
    const limitStage = {
      $limit: Number(limit),
    };

    pipeline.push(skipStage, limitStage);

    const items = await CsvData.aggregate(pipeline).exec();

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

