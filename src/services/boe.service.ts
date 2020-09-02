import { AjaxService } from './ajax.service';
import { BOE_BASE_URL, BOE_API } from '../lib';
import { Boe } from '../../data/models/boe.model';
import { Observable, throwError, of } from 'rxjs';
import { BoeAdapter } from './adapters/boe.adapter';
import { createError, HttpStatus } from '../models';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { pluck, map, concatMap, switchMap } from 'rxjs/operators';
import { DateService } from './date.service';

/**
 * This service is in charge of finding BOE through the BoeApi
 * by a given date, parse it and return a collection of contracts held in the BOE model.
 */
export class BoeService extends AjaxService implements BoeAdapter {
  private readonly BoeQuery = 'id=BOE-S-';
  private static instance: BoeService;
  private url: string;
  private ajaxRequest: AjaxRequest | undefined;
  private dateService: DateService;

  private constructor() {
    super();
    this.url = `${BOE_BASE_URL}/${BOE_API}`;
    this.dateService = DateService.getInstance();
  }

  static getInstance(): BoeService {
    if (!BoeService.instance) {
      BoeService.instance = new BoeService();
    }

    return BoeService.instance;
  }

  findBoeByDate(date: Date): Observable<Boe> {
    if (!date) {
      return throwError(createError('Invalid date', HttpStatus.BAD_REQUEST));
    }

    let query = this.BoeQuery + this.dateService.toBoeFormat(date);

    this.ajaxRequest = this.createAjaxConfig(`${this.url}?${query}`);

    return ajax(this.ajaxRequest).pipe(pluck('response'));
  }

  findBoeByDateRange(dateStart: Date, dateEnd: Date): Observable<Boe[]> {
    throw new Error('Method not implemented.');
  }
}
