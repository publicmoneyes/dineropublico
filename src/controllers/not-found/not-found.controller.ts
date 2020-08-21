import express, { Router, Request, Response } from 'express';

const notFoundRouter: Router = express.Router();

export const notFoundController = (): Router => {
  notFoundRouter.route('/').get((req: Request, res: Response) => {
    res.status(404).send('Resource not found!');
  });

  return notFoundRouter;
};
