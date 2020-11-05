import express, { Router, Request, Response } from 'express';
import { Boe, HttpStatus } from '../../models';
import { BoeService } from '../../services';
import { ContractService } from '../../services/contract.service';

const contractRouter: Router = express.Router();

const saveContract = async (req: Request, res: Response) => {
  const boeService: BoeService = BoeService.getInstance();
  const contractService: ContractService = ContractService.getInstance();

  try {
    const boe: Boe = await boeService.findBoeByDate(new Date()).toPromise();
    const contracts = await contractService.getContractsById(boe).toPromise();
    const savedContracts = await contractService.saveMany(contracts);
    res.status(HttpStatus.OK).json(savedContracts);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const getContracts = async (req: Request, res: Response) => {
  const contractService: ContractService = ContractService.getInstance();
  const { dateStart, dateEnd } = req.query;

  try {
    const start = new Date(+(dateStart as string));
    const end = new Date(+(dateEnd as string));
    const contracts = await contractService.findByDateRange(start, end);
    res.status(HttpStatus.OK).json(contracts);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const contractsController = (): Router => {
  // This endpoint will be hit each day at 01:00 AM in order to save the daily boes
  contractRouter.route('/save-contract').get(saveContract);
  contractRouter.route('/contracts').get(getContracts);

  return contractRouter;
};
