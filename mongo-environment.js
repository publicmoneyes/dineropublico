const NodeEnvironment = require('jest-environment-node');

module.exports = class MongoEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
  }

  async setup() {
    console.log('Setup MongoDB Test Environment');

    const globalConfig = {
      "mongoDBName": "jest",
      "mongoUri": "mongodb://127.0.0.1:59252/jest"
    }

    this.global.__MONGO_URI__ = globalConfig.mongoUri;
    this.global.__MONGO_DB_NAME__ = globalConfig.mongoDBName;

    await super.setup();
  }

  async teardown() {
    console.log('Teardown MongoDB Test Environment');

    await super.teardown();
  }

  runScript(script) {
    return super.runScript(script);
  }
};