const MongodbMemoryServer = require('mongodb-memory-server');

const mongod = new MongodbMemoryServer.default({
  instance: {
    dbName: 'jest'
  }
});

module.exports = async function () {
  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: await mongod.getConnectionString()
  };

  // Write global config to disk because all tests run in different contexts.
  // fs.writeFileSync(globalConfigPath, JSON.stringify(mongoConfig));
  // console.log('Config is written');

  // Set reference to mongod in order to close the server during teardown.
  global.__MONGOD__ = mongod;
  process.env.MONGO_URL = mongoConfig.mongoUri;
};