const fs = require('fs');
const CsvData = require('../src/models/csvModel');
const { csvService } = require('../src/services/csvService');

jest.mock('fs');
jest.mock('../src/models/csvModel');

describe('Test csvService', () => {
  it('Should create data in the database submitting CSV file', async () => {
    const req = {
      file: {
        path: '../uploads/Tomatoes.csv',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const mockCsvData = [
      { name: 'Usuário 1', email: 'usuario1@example.com' },
      { name: 'Usuário 2', email: 'usuario2@example.com' },
    ];
    const mockSavedData = [
      { _id: '1', data: { name: 'Usuário 1', email: 'usuario1@example.com' } },
      { _id: '2', data: { name: 'Usuário 2', email: 'usuario2@example.com' } },
    ];

    CsvData.insertMany.mockResolvedValue(mockSavedData);

    await csvService(req, res);

    expect(fs.createReadStream).toHaveBeenCalledWith('../uploads/Tomatoes.csv');
    expect(CsvData.insertMany).toHaveBeenCalledWith(mockCsvData);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith(mockSavedData);
  });

  it('Should return internal error if error saving into database', async () => {
    const req = {
      file: {
        path: '../uploads/Tomatoes.csv',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockStream = { pipe: jest.fn().mockReturnThis(), on: jest.fn() };
    fs.createReadStream = jest.fn().mockReturnValue(mockStream);

    const errorMessage = 'Database error';
    CsvData.insertMany.mockRejectedValue(new Error(errorMessage));

    await csvService(req, res);

    expect(fs.createReadStream).toHaveBeenCalledWith('../uploads/Tomatoes.csv');
    expect(CsvData.insertMany).toHaveBeenCalledWith(expect.any(Array));
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Internal error saving data.');
  });

  it('Should return internal error  if error reading CSV', async () => {
    const req = {
      file: {
        path: '../uploads/Tomatoes.csv',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const mockStream = { pipe: jest.fn().mockReturnThis(), on: jest.fn() };
    fs.createReadStream = jest.fn().mockReturnValue(mockStream);

    await csvService(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Internal error reading file.');
  });
});



jest.mock('../src/models/csvModel');

describe('Test service csvReadService', () => {
  it('Should return database items that match the search', async () => {
    const req = {
      query: {
        page: '1',
        limit: '10',
        q: 'User',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mockItems = [{ _id: '1', data: { name: 'Usuário 1', email: 'usuario1@example.com' } }, { _id: '2', data: { name: 'Usuário 2', email: 'usuario2@example.com' } }];
    const mockFilter = {
      $or: [{ 'data.name': /User/i }],
    };

    CsvData.find = jest.fn().mockReturnThis();
    CsvData.limit = jest.fn().mockReturnThis();
    CsvData.skip = jest.fn().mockReturnThis();
    CsvData.exec = jest.fn().mockResolvedValue(mockItems);

    await csvReadService(req, res);

    expect(CsvData.find).toHaveBeenCalledWith(mockFilter);
    expect(CsvData.limit).toHaveBeenCalledWith(10);
    expect(CsvData.skip).toHaveBeenCalledWith(0);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockItems);
  });

  it('Should return an internal error if an error occurs while fetching items from the database', async () => {
    const req = {
      query: {
        page: '1',
        limit: '10',
        q: 'Usuário',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    CsvData.find = jest.fn().mockReturnThis();
    CsvData.limit = jest.fn().mockReturnThis();
    CsvData.skip = jest.fn().mockReturnThis();
    CsvData.exec = jest.fn().mockRejectedValue(new Error('Error finding data'));

    await csvReadService(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith('Internal error.');
  });
});
