import { Server } from 'http';
import cors, { CorsOptions } from 'cors';
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
const corsOptions: CorsOptions = {
  optionsSuccessStatus: 200,
};

if (process.env.NODE_ENV !== 'production') {
  // corsOptions.origin = '*'; // Disable cors for dev/localhost
  // server.use('/api/', bulkController());
  server.use('/api/', testingController());
} else {
  console.info('Production is running');
  const allowedListOfOrigins = [SSR_ORIGIN, HOSTING_ORIGIN, OVH_ORIGIN];
  corsOptions.origin = allowedListOfOrigins.map((origin) => origin!);
}

// server.use(cors(corsOptions));
// server.use(logger);
server.use('/', (req, res) => {
  res.send('Ok baby');
});
server.use('/api/', testingController());
server.use('/api/', contractsController());
server.use('*', notFoundController());

const serverInstance: Server = server.listen(PORT, async () => {
  console.info(`Server is running at port ${PORT}`);
  console.info(`Running environment: ${process.env.NODE_ENV}`);
  await db.connect();
});

server.on('close', () => {
  db.disconnect();
});

process.on('SIGINT', () => {
  serverInstance.close();
});
