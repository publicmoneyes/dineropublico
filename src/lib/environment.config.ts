import * as dotenv from 'dotenv';

const configEnvironment = (): string => {
  let configPath: string = '';

  switch (process.env.NODE_ENV) {
    case 'production':
      configPath = `${__dirname}/../../.env.production`;
    case 'development':
      configPath = `${__dirname}/../../.env.development`;
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
