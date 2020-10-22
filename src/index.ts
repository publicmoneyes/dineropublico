import express, { Application } from 'express';
import { PORT } from './lib/environment.config';
import { Server } from 'http';
import { notFoundController } from './controllers/not-found/not-found.controller';
import { logger, cors } from './lib';
import { saveContractController } from './controllers/save-contracts/save-contracts.controller';
import { DatabaseHandler } from './data/config.db';

const server: Application = express();
const db = DatabaseHandler.getInstance();

server.use(cors);
server.use(logger);

server.use('/api/', saveContractController());
server.use('*', notFoundController());

const serverInstance: Server = server.listen(PORT, async () => {
  console.log(`Server is running at port ${PORT}`);
  await db.connect();
});

server.on('close', () => {
  db.disconnect();
});

process.on('SIGINT', () => {
  serverInstance.close();
});
