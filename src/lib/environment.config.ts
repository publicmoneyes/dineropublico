import * as dotenv from 'dotenv';
import { LoggerService } from '../services';

const configEnvironment = (): string => {
  let configPath: string = '';

  LoggerService.getInstance().info(`Running environment .${JSON.stringify(process.env)}.`);

  switch (process.env.NODE_ENV) {
    case 'production':
      configPath = `${__dirname}/../../.env.production`;
    case 'development':
      configPath = `${__dirname}/../../.env.development`;
    case 'test':
      configPath = `${__dirname}/../../.env.test`;
    default:
      configPath = `${__dirname}/../../.env`;
  }

  return configPath;
};

const config = dotenv.config({
  path: configEnvironment(),
});

if (config.error) {
  throw config.error;
}

export const PRODUCTION = process.env.PRODUCTION;
export const PORT = process.env.HTTP_PORT;
export const BOE_API = process.env.BOE_API;
export const BOE_BASE_URL = process.env.BOE_BASE_URL;
export const MONGO_USER = process.env.MONGO_USER;
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
export const MONGO_URL = process.env.MONGO_URL;

export const ENVIRONMENTS = {
  DEV: 'development',
  PROD: 'production',
  TEST: 'test',
};
