import { ContractAdapter } from './adapters';
import { DateService } from './date.service';
import { BOE_BASE_URL, BOE_API } from '../lib';
import { Xml2JsonService } from './xml2json.service';
import { Contract } from '../models';

/**
 * This service is in charge of finding contracts through the BoeApi by a given id and saving them to our mongo database.
 * Also the find methods retrieve information from the mongo database
 */
export class ContractService implements ContractAdapter {
  private readonly BoeQuery = 'id=BOE-S-';
  private static instance: ContractService;
  private url: string;
  private xml2jsonService: Xml2JsonService;
  private dateService: DateService;

  private constructor() {
    this.url = `${BOE_BASE_URL}/${BOE_API}`;
    this.dateService = DateService.getInstance();
    this.xml2jsonService = Xml2JsonService.getInstance();
  }

  static getInstance(): ContractService {
    if (!ContractService.instance) {
      ContractService.instance = new ContractService();
    }

    return ContractService.instance;
  }

  findByDate(date: Date): Contract {
    throw new Error('Method not implemented.');
  }
  findByDateRange(startDate: Date, endDate: Date): Contract[] {
    throw new Error('Method not implemented.');
  }
  save(contract: Contract): Contract {
    throw new Error('Method not implemented.');
  }
  saveMany(contracts: Contract[]): number {
    throw new Error('Method not implemented.');
  }
}
