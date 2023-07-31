const request = require('supertest');
const app = require('../src/index');
const CsvData = require('../src/models/csvModel');


describe('Testing routes', () => {
  test('POST /file - Should return status 200', async () => {
    const res = await request(app)
      .post('/file')
      .attach('csvFile', '../uploads/');

    expect(res.status).toBe(200);
  });

  test('GET /users - Should return status 200', async () => {
    const res = await request(app).get('/api/users');

    expect(res.status).toBe(200);
  });

  it('Should return status 404 when users are not found', async () => {
    await CsvData.deleteMany({});

    const res = await request(app).get('/users');

    expect(res.status).toBe(404);
  });

});



