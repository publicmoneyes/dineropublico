import express, { Application } from 'express';
import { PORT } from './lib/environment.config';
import { Server } from 'http';
import { notFoundController } from './controllers/not-found/not-found.controller';
import { logger, cors } from './lib';
import { contractsController } from './controllers/save-contracts/save-contracts.controller';
import { DatabaseHandler } from './data/config.db';

const server: Application = express();
const db = DatabaseHandler.getInstance();

server.use(cors);
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
