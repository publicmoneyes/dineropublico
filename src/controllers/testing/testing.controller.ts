import express, { Router, Request, Response } from 'express';
import { utils } from '../../core';
import { HttpStatus } from '../../models';
import { ContractService } from '../../services/contract.service';

const testingRouter: Router = express.Router();

const getMappedContract = async (req: Request, res: Response) => {
  const contractService: ContractService = ContractService.getInstance();
  const { boeid } = req.query;

  try {
    const contracts = await contractService.getContractByBoeId(boeid as string).toPromise();

    console.log('utils.objectInformationPercentage(contracts)', utils.objectInformationPercentage(contracts));
    res.status(HttpStatus.OK).json([contracts]);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const getOneFromCollection = async (req: Request, res: Response) => {
  const contractService: ContractService = ContractService.getInstance();
  const { boeid } = req.query;

  try {
    let boestring: string = boeid!.toString();
    const contracts = await contractService.findContractByBoeId(boestring);

    console.log('utils.objectInformationPercentage(contracts)', utils.objectInformationPercentage(contracts));
    res.status(HttpStatus.OK).json([contracts]);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

const getRawContract = async (req: Request, res: Response) => {
  const contractService: ContractService = ContractService.getInstance();
  const { boeid } = req.query;

  try {
    const contracts = await contractService.getRawContractByBoeId(boeid as string).toPromise();

    res.status(HttpStatus.OK).json(contracts);
  } catch (err) {
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(err);
  }
};

export const testingController = (): Router => {
  testingRouter.route('/mapped-json').get(getMappedContract);
  testingRouter.route('/raw-json').get(getRawContract);
  testingRouter.route('/one').get(getOneFromCollection);

  return testingRouter;
};
