import { Observable, throwError, of } from 'rxjs';
import { AjaxService } from './ajax.service';
import { Boe } from '../../data/models/boe.model';
import { BoeAdapter } from './adapters/boe.adapter';
import { ajax, AjaxRequest, AjaxResponse } from 'rxjs/ajax';
import { BOE_BASE_URL, BOE_API } from '../lib';
import { createError, HttpStatus } from '../models';

/**
 * This service is in charge of finding BOE through the BoeApi
 * by a given date, parse it and return a collection of contracts held in the BOE model.
 */
export class BoeService extends AjaxService implements BoeAdapter {
  private static instance: BoeService;
  private url: string;

  private constructor() {
    super();
    this.url = `${BOE_BASE_URL}/${BOE_API}`;
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
    return of();
  }

  findBoeByDateRange(dateStart: Date, dateEnd: Date): Observable<Boe[]> {
    throw new Error('Method not implemented.');
  }
}
