import express, { Router, Request, Response } from 'express';
import { Boe, HttpStatus } from '../../models';
import { BoeService } from '../../services';
import { ContractService } from '../../services/contract.service';

const saveContractRouter: Router = express.Router();

export const saveContractController = (): Router => {
  // This endpoint will be hit each day at 01:00 AM in order to save the daily boes
  saveContractRouter.route('/save-contract').get(async (req: Request, res: Response) => {
    // TODO: Obtener fecha para pedir el boe.
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
  });

  return saveContractRouter;
};
