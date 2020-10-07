import express, { Application, Request, Response, NextFunction } from 'express';
import { PORT } from './lib/environment.config';
import { Server } from 'http';
import { notFoundController } from './controllers/not-found/not-found.controller';
import { logger, cors } from './lib';
import { saveContractController } from './controllers/save-contracts/save-contracts.controller';

const server: Application = express();

server.use(cors);
server.use(logger);

//TODO:
server.use('/api/hello', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello');
});

server.use('/api/', saveContractController());
server.use('*', notFoundController());

const serverInstance: Server = server.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

server.on('close', () => {
  //TODO: close db connections
});

process.on('SIGINT', () => {
  serverInstance.close();
});
