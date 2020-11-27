import mongoose, { ConnectionOptions } from 'mongoose';
import { MONGO_PASSWORD, MONGO_URL, MONGO_USER } from '../lib';

export class DatabaseHandler {
  private uri: string;
  private mongooseOptions: ConnectionOptions;
  private static instance: DatabaseHandler;

  private constructor() {
    this.uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_URL}?retryWrites=true&w=majority`;
    this.mongooseOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  }

  public static getInstance(): DatabaseHandler {
    if (!DatabaseHandler.instance) {
      DatabaseHandler.instance = new DatabaseHandler();
    }

    return DatabaseHandler.instance;
  }

  public async connect(): Promise<void> {
    await mongoose.connect(this.uri, this.mongooseOptions).then(this.connectionHandler).catch(this.errorHandler);
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.info(`Connected to DB ${this.uri}`);
    } catch (error) {
      console.error(`Error while disconnecting --> ${error}`);
    }
  }

  public async clearDb() {}

  private errorHandler(error: any): void {
    console.error(`MongoDB Error --> ${error}`);
  }

  private connectionHandler() {
    console.info(`Connected to DB`);
  }
}
