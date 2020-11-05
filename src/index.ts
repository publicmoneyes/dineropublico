import express, { Application } from 'express';
import { PORT } from './lib/environment.config';
import { Server } from 'http';
import { notFoundController } from './controllers/not-found/not-found.controller';
import { logger, cors } from './lib';
import { contractsController } from './controllers/contracts/contracts.controller';
import { DatabaseHandler } from './data/config.db';
import { testingController } from './controllers';
import { ENVIRONMENTS } from './core';
import { bulkController } from './controllers/bulk/bulk.controller';

const server: Application = express();
const db = DatabaseHandler.getInstance();

server.use(cors);
// server.use(logger);

server.use('/api/', contractsController());

if (process.env.NODE_ENV !== ENVIRONMENTS.PROD) {
  server.use('/api/', bulkController());
  server.use('/api/', testingController());
}

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
