// @ts-ignore
import { XMLHttpRequest } from 'xhr2';
import { Boe, Contract, defaultContract, InvalidContract } from '../models';
import { parseStringPromise } from 'xml2js';
import { ContractAdapter } from './adapters';
import { DateService } from './date.service';
import { LoggerService } from './log.service';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { BOE_BASE_URL, BOE_API } from '../lib';
import { asapScheduler, forkJoin, Observable, of } from 'rxjs';
import { ContractApiModel } from './api-models';
import { Xml2JsonService } from './xml2json.service';
import { contractMapper } from './mappers/contract.mapper';
import { pluck, concatMap, map, catchError } from 'rxjs/operators';
import { ContractRepository } from '../repositories/contract.repository';
import { utils } from '../core';

/**
 * This service is in charge of finding contracts through the BoeApi by a given id and saving them to our mongo database.
 * Also the find methods retrieve information from the mongo database
 */
export class ContractService implements ContractAdapter {
  private readonly MIN_PERCENTAGE_THRESHOLD = 40;
  private static instance: ContractService;
  private repository: ContractRepository;
  private url: string;
  private xml2jsonService: Xml2JsonService;
  private dateService: DateService;
  private logService: LoggerService;

  private constructor() {
    this.url = `${BOE_BASE_URL}/${BOE_API}`;
    this.dateService = DateService.getInstance();
    this.xml2jsonService = Xml2JsonService.getInstance();
    this.logService = LoggerService.getInstance();
    this.repository = ContractRepository.getInstance();
  }

  static getInstance(): ContractService {
    if (!ContractService.instance) {
      ContractService.instance = new ContractService();
    }

    return ContractService.instance;
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<Contract[]> {
    startDate = this.dateService.setFirstTimeOfTheDay(startDate);
    endDate = this.dateService.setLastTimeOfTheDay(endDate);

    if (this.dateService.isBefore(endDate, startDate)) {
      this.logService.error(`ContractService.findByDateRange: [${startDate}, ${endDate}]`);

      throw new Error('Invalid date');
    }

    return await this.repository.findByDateRange(startDate, endDate);
  }

  async saveMany(contracts: Contract[]): Promise<number> {
    this.logService.info(`ContractService.SaveMany -> Saving ${contracts.length} items"`);
    let validContracts: Contract[] = [];
    let invalidContractsIdentifiers: InvalidContract[] = [];
    contracts.forEach((contract: Contract) => {
      if (utils.objectInformationPercentage(contract) <= this.MIN_PERCENTAGE_THRESHOLD) {
        const { identifier } = contract.metadata;
        invalidContractsIdentifiers.push({ identifier });
      } else {
        validContracts.push({ ...contract });
      }
    });

    // dont need to wait for this
    this.repository.saveInvalidContracts(invalidContractsIdentifiers);

    return await this.repository.saveMany(validContracts);
  }

  findContractByBoeId(boeId: string): Promise<Contract | null> {
    return this.repository.findByBoeId(boeId);
  }

  getContractByBoeId(boeid?: string): Observable<Contract> {
    if (boeid) {
      return this.getContract(`${this.url}?id=${boeid}`);
    }

    return of(defaultContract());
  }

  getRawContractByBoeId(boeid?: string): Observable<ContractApiModel> {
    if (boeid) {
      return this.getRawContract(`${this.url}?id=${boeid}`);
    }

    return of({} as ContractApiModel);
  }

  getContractsById(boe: Boe): Observable<Contract[]> {
    const { contractIdCollection } = boe;

    let observableContractCollection: Observable<Contract>[] = contractIdCollection.map((id) => this.getContract(`${this.url}?id=${id}`));

    return observableContractCollection.length ? forkJoin(observableContractCollection) : of([]);
  }

  public getContract(url: string): Observable<Contract> {
    return ajax(this.createAjaxConfig(url)).pipe(
      pluck('response'),
      concatMap<string, Promise<ContractApiModel>>(this.xml2jsonService.parseXmlToJson),
      map<ContractApiModel, Contract>(contractMapper)
    );
  }

  public getRawContract(url: string): Observable<ContractApiModel> {
    return ajax(this.createAjaxConfig(url)).pipe(pluck('response'), concatMap<string, Promise<ContractApiModel>>(this.xml2jsonService.parseXmlToJson));
  }

  private createAjaxConfig(url: string): AjaxRequest {
    return {
      createXHR: () => new XMLHttpRequest(),
      url,
      method: 'GET',
      crossDomain: true,
      responseType: 'text',
    };
  }
}
