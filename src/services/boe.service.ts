import { BoeAdapter } from './adapters';
import { BoeApiModel } from './api-models';
import { DateService } from './date.service';
import { BOE_BASE_URL, BOE_API } from '../lib';
import { boeMapper } from './mappers/boe.mapper';
import { Xml2JsonService } from './xml2json.service';
import { pluck, map, concatMap } from 'rxjs/operators';
import { Observable, throwError, forkJoin } from 'rxjs';
import { FIRST_DATE, utils } from '../core';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { createError, HttpStatus, Boe, defaultBoe } from '../models';
import { LoggerService } from './log.service';

/**
 * This service is in charge of finding BOE through the BoeApi
 * by a given date, parse it and return a collection of contracts held in a BOE model.
 */
export class BoeService implements BoeAdapter {
  private readonly BoeQuery = 'id=BOE-S-';
  private static instance: BoeService;
  private url: string;
  private ajaxRequest: AjaxRequest | undefined;
  private dateService: DateService;
  private xml2jsonService: Xml2JsonService;
  private logService: LoggerService;

  private constructor() {
    this.url = `${BOE_BASE_URL}/${BOE_API}`;
    this.dateService = DateService.getInstance();
    this.xml2jsonService = Xml2JsonService.getInstance();
    this.logService = LoggerService.getInstance();
  }

  static getInstance(): BoeService {
    if (!BoeService.instance) {
      BoeService.instance = new BoeService();
    }

    return BoeService.instance;
  }

  findBoeByDate(date: Date): Observable<Boe> {
    this.logService.info(`BoeService.findBoeByDate: [${date}]`);

    if (this.isInvalidDate(date)) {
      this.logService.error(`BoeService.findBoeByDate: Invalid date [${date}]`);
      return throwError(createError('Invalid date', HttpStatus.BAD_REQUEST));
    }

    let query = this.BoeQuery + this.dateService.toBoeFormat(date);

    this.ajaxRequest = this.createAjaxConfig(`${this.url}?${query}`);

    return ajax(this.ajaxRequest).pipe(
      pluck('response'),
      concatMap<string, Promise<BoeApiModel>>(this.xml2jsonService.parseXmlToJson),
      map<BoeApiModel, Boe>(boeMapper)
    );
  }

  findBoeByDateRange(dateStart: Date, dateEnd: Date): Observable<Boe> {
    this.logService.info(`BoeService.findBoeByDateRange: [${dateStart}, ${dateEnd}]`);

    if (this.isInvalidDate(dateStart, dateEnd)) {
      this.logService.error(`BoeService.findBoeByDateRange: [${dateStart}, ${dateEnd}]`);
      return throwError(createError('Invalid date', HttpStatus.BAD_REQUEST));
    }

    // create date collection from start to end
    const dateCollection = utils.createDateCollection(dateStart, dateEnd);
    // reduce to observables collection
    const ajaxCallsCollection: Observable<AjaxResponse>[] = dateCollection.reduce((acc: Observable<AjaxResponse>[], current: Date) => {
      let query = this.BoeQuery + this.dateService.toBoeFormat(current);

      let ajaxConfig = this.createAjaxConfig(`${this.url}?${query}`);
      let ajaxCall = ajax(ajaxConfig);

      return acc.concat(ajaxCall);
    }, []);

    // forkjoin the ajax calls
    return forkJoin(ajaxCallsCollection).pipe(
      // extract responses
      map((responses: AjaxResponse[]) => responses.map((r) => r.response)),
      concatMap<string[], Promise<BoeApiModel[]>>((xmlCollection: string[]) => {
        // parse xml to json
        let promiseCollection: Promise<BoeApiModel>[] = xmlCollection.map(this.xml2jsonService.parseXmlToJson);
        return Promise.all(promiseCollection);
      }),
      map<BoeApiModel[], Boe>((boeApiModelCollection: BoeApiModel[]) => {
        // map api json to Boe model
        let boe = defaultBoe();
        let mappedBoes: Boe[] = boeApiModelCollection.map(boeMapper);
        // merge al ID in one Boe
        boe.contractIdCollection = mappedBoes.reduce((acc: string[], current: Boe) => acc.concat(current.contractIdCollection), []);

        return boe;
      })
    );
  }

  private isInvalidDate(...args: Date[]): boolean {
    if (args.length == 1) {
      return !args[0] || this.dateService.isBefore(args[0], FIRST_DATE);
    }

    let invalidStartDate: boolean = !args[0] || this.dateService.isBefore(args[0], FIRST_DATE);
    let invalidEndDate: boolean = !args[1] || this.dateService.isBefore(args[1], FIRST_DATE);

    return invalidEndDate || invalidStartDate || this.dateService.isBefore(args[1], args[0]);
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
