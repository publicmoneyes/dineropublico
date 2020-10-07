// @ts-ignore
import { XMLHttpRequest } from 'xhr2';
import { Boe, Contract } from '../models';
import { parseStringPromise } from 'xml2js';
import { ContractAdapter } from './adapters';
import { DateService } from './date.service';
import { LoggerService } from './log.service';
import { ajax, AjaxRequest } from 'rxjs/ajax';
import { BOE_BASE_URL, BOE_API } from '../lib';
import { forkJoin, Observable, of } from 'rxjs';
import { ContractApiModel } from './api-models';
import { Xml2JsonService } from './xml2json.service';
import { contractMapper } from './mappers/contract.mapper';
import { pluck, concatMap, map, catchError } from 'rxjs/operators';
import { ContractRepository } from '../repositories/contract.repository';

/**
 * This service is in charge of finding contracts through the BoeApi by a given id and saving them to our mongo database.
 * Also the find methods retrieve information from the mongo database
 */
export class ContractService implements ContractAdapter {
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

    return await this.repository.saveMany(contracts);
  }

  getContractsById(boe: Boe): Observable<Contract[]> {
    const { contractIdCollection } = boe;

    let observableContractCollection: Observable<Contract>[] = contractIdCollection.map((id) => this.getContract(`${this.url}?id=${id}`));

    return observableContractCollection.length
      ? forkJoin(observableContractCollection).pipe(
          catchError((err) => {
            console.log(err);
            return of(err);
          })
        )
      : of([]);
  }

  public getContract(url: string): Observable<Contract> {
    return ajax(this.createAjaxConfig(url)).pipe(
      pluck('response'),
      concatMap<string, Promise<ContractApiModel>>(this.xml2jsonService.parseXmlToJson),
      map<ContractApiModel, Contract>(contractMapper)
    );
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
