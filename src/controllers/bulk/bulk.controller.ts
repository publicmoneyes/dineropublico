import express, { Router, Request, Response } from 'express';
import { utils } from '../../core';
import { Boe, Contract, HttpStatus } from '../../models';
import { BoeService, DateService } from '../../services';
import { ContractService } from '../../services/contract.service';

const bulkRouter: Router = express.Router();
const ITEMS_PER_GROUP = 50;

const saveContractsBetweenDates = async (req: Request, res: Response) => {
  const contractService: ContractService = ContractService.getInstance();
  const boeService: BoeService = BoeService.getInstance();
  const dateService: DateService = DateService.getInstance();
  const { boeid } = req.query;

  try {
    let startDate = new Date(Date.UTC(2020, 10, 1, 0, 0, 0));
    let endDate = new Date(Date.UTC(2020, 10, 26, 22, 59, 59));
    console.log('startDate', startDate);
    console.log('endDate', endDate);

    let boe: Boe = await boeService.findBoeByDateRange(startDate, endDate).toPromise();
    console.log('boeId found: ', boe.contractIdCollection.length);

    let groupOfBoeIds = [...utils.splitIn(ITEMS_PER_GROUP, boe.contractIdCollection)];
    let mappedContracts: Contract[] = [];

    for (let index = 0; index < groupOfBoeIds.length; index++) {
      console.log(`Group ${index} of ${groupOfBoeIds[index].length} items`);
      let tboe: Boe = {
        contractIdCollection: [...groupOfBoeIds[index]],
      };
      let contracts: Contract[] = await contractService.getContractsById(tboe).toPromise();
      console.log(`Group ${index} of ${contracts.length} items finished`);
      mappedContracts.push(...contracts);
    }

    // save all contrcats
    const savedMapped = await contractService.saveMany(mappedContracts);

    res.status(HttpStatus.OK).json(savedMapped);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const bulkController = (): Router => {
  bulkRouter.route('/bulk').get(saveContractsBetweenDates);

  return bulkRouter;
};
