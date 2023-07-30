const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

describe('Database Connection', () => {
  let mongoServer;

  beforeAll(async () => {
    const mongoUri = await mongoServer.getUri();

    process.env.DB_USER = 'test_user';
    process.env.DB_PASSWORD = 'test_password';

    mongoServer = new MongoMemoryServer();

    jest.spyOn(mongoose, 'connect').mockResolvedValueOnce();

    require('../src/database/index');

    expect(mongoose.connect).toHaveBeenCalledWith(mongoUri);
  });

  afterAll(async () => {

    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test('Should connect to the database', async () => {

    await expect(mongoose.connection.readyState).toEqual(1);
  });

});
