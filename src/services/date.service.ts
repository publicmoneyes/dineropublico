import { DateAdapter } from './adapters/date.adapter';
import 'dayjs/locale/es';
import * as dayjs from 'dayjs';

export class DateService implements DateAdapter {
  private lib = dayjs.default;
  private static instance: DateService;

  private constructor() {
    dayjs.locale('es');
  }

  static getInstance(): DateService {
    if (!DateService.instance) {
      DateService.instance = new DateService();
    }

    return DateService.instance;
  }

  isLeapYear(date: Date): boolean {
    throw new Error('Method not implemented.');
  }

  isBetween(start: Date, end: Date): boolean {
    throw new Error('Method not implemented.');
  }

  isBefore(first: Date, second: Date): boolean {
    return this.lib(first).isBefore(second);
  }

  isAfter(first: Date, second: Date): boolean {
    return this.lib(first).isAfter(second);
  }

  getDayOfMonth(date: Date): number {
    throw new Error('Method not implemented.');
  }

  getMonth(date: Date): number {
    return this.lib(date).get('month');
  }

  getYear(date: Date): number {
    return this.lib(date).get('year');
  }

  getLastDateOfMonth(date: Date): number {
    throw new Error('Method not implemented.');
  }

  getHours(date: Date): number {
    return this.lib(date).get('hour');
  }

  parseDate(date: number): Date {
    throw new Error('Method not implemented.');
  }

  toString(date: Date): string {
    throw new Error('Method not implemented.');
  }

  addHours(date: Date, hours: number): Date {
    this.lib(date).add(hours, 'hour');
    return date;
  }

  substractHours(date: Date, hours: number): Date {
    throw new Error('Method not implemented.');
  }

  addDays(date: Date, days: number): Date {
    throw new Error('Method not implemented.');
  }

  substractDays(date: Date, days: number): Date {
    throw new Error('Method not implemented.');
  }

  substractMonths(date: Date, months: number): Date {
    throw new Error('Method not implemented.');
  }

  setDateToStart(date: Date): Date {
    throw new Error('Method not implemented.');
  }

  setDateToEnd(date: Date): Date {
    throw new Error('Method not implemented.');
  }
}
