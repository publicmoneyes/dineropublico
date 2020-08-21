import express, { Application, Request, Response, NextFunction } from 'express';
import { PORT } from './lib/environment.config';
import { Server } from 'http';
import { notFoundController } from './controllers/not-found/not-found.controller';
import { LoggerService } from './services';

const server: Application = express();
const logger = (req: Request, res: Response, next: NextFunction) => {
  const service = LoggerService.getInstance();
  service.info(`[${req.method}] - ${req.url}`);

  next();
};

// server.use((req: Request, res: Response, next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
//   );
//   res.header('Access-Control-Allow-Methods', 'GET');
//   res.header('Allow', 'GET');
//   next();
// });

server.use(logger);

//TODO:
server.use('/api/hello', (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello');
});

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
