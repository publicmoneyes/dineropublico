import mongoose, { ConnectionOptions } from 'mongoose';
import { LoggerService } from '../services';

export class DatabaseHandler {
  private uri: string;
  private mongooseOptions: ConnectionOptions;
  private logger: LoggerService = LoggerService.getInstance();
  private static instance: DatabaseHandler;

  private constructor() {
    this.uri = 'mongodb://127.0.0.1:27017/testingdb';
    this.mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  }

  public static getInstance(): DatabaseHandler {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler();
    }

    return DatabaseHandler.instance;
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.uri, this.mongooseOptions).catch(this.errorHandler);
    mongoose.connection.once('open', this.connectionHandler);
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      this.logger.info(`Connected to DB ${this.uri}`);
    } catch (error) {
      this.logger.error(`Error while disconnecting --> ${error}`);
    }
  }

  public async clearDb() {}

  private errorHandler(error: any): void {
    this.logger.error(`MongoDB Error --> ${error}`);
  }

  private connectionHandler() {
    this.logger.info(`Connected to DB ${this.uri}`);
  }
}
