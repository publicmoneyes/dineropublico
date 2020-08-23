import { NextFunction, Response, Request } from 'express';
import { LoggerService } from '../services';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const service = LoggerService.getInstance();
  service.info(`[${req.method}] - ${req.url}`);

  next();
};
