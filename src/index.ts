import { Server } from 'http';
import cors from 'cors';
import { logger } from './lib';
import express, { Application } from 'express';
import { HOSTING_ORIGIN, OVH_ORIGIN, PORT, SSR_ORIGIN } from './lib/environment.config';
import { testingController } from './controllers';
import { DatabaseHandler } from './data/config.db';
import { bulkController } from './controllers/bulk/bulk.controller';
import { notFoundController } from './controllers/not-found/not-found.controller';
import { contractsController } from './controllers/contracts/contracts.controller';

const server: Application = express();
const db = DatabaseHandler.getInstance();
const allowedListOfOrigins = [SSR_ORIGIN, HOSTING_ORIGIN, OVH_ORIGIN];
const corsOptions = {
  origin: (origin: any, callback: Function) => {
    if (!origin || allowedListOfOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`"${origin}" Not allowed by CORS`));
    }
  },
};

if (process.env.NODE_ENV !== 'production') {
  corsOptions.origin = (origin, cb) => cb(null, true); // Disable cors for dev/localhost
  server.use('/api/', bulkController());
  server.use('/api/', testingController());
}

server.use(cors(corsOptions));
server.use(logger);
server.use('/api/', contractsController());
server.use('*', notFoundController());

const serverInstance: Server = server.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  console.log(`Running environment: ${process.env.NODE_ENV}`);
  await db.connect();
});

server.on('close', () => {
  db.disconnect();
});

process.on('SIGINT', () => {
  serverInstance.close();
});
