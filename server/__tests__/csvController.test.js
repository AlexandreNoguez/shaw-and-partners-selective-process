const { postFileCsv, readFileCsv } = require('../src/controllers/csvController');
const { csvService, csvReadService } = require('../src/services/csvService');


jest.mock('../src/services/csvService', () => ({
  csvService: jest.fn(),
  csvReadService: jest.fn(),
}));

describe('csvController', () => {
  describe('postFileCsv', () => {
    test('Should call csvService with correct arguments', async () => {
      const mockRequest = {};
      const mockResponse = {};


      await postFileCsv(mockRequest, mockResponse);


      expect(csvService).toHaveBeenCalledWith(mockRequest, mockResponse);
    });
  });

  describe('readFileCsv', () => {
    test('Should call csvReadService with correct arguments', async () => {
      const mockRequest = {};
      const mockResponse = {};


      await readFileCsv(mockRequest, mockResponse);


      expect(csvReadService).toHaveBeenCalledWith(mockRequest, mockResponse);
    });
  });
});
