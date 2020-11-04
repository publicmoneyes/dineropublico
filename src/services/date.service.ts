import { DateAdapter } from './adapters';
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

  setFirstTimeOfTheDay(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  }

  setLastTimeOfTheDay(date: Date): Date {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59));
  }

  isBefore(first: Date, second: Date): boolean {
    return this.lib(first).isBefore(second);
  }

  isAfter(first: Date, second: Date): boolean {
    return this.lib(first).isAfter(second);
  }

  getMonth(date: Date): number {
    return this.lib(date).get('month');
  }

  getYear(date: Date): number {
    return this.lib(date).get('year');
  }

  getHours(date: Date): number {
    return this.lib(date).get('hour');
  }

  addHours(date: Date, hours: number): Date {
    return this.lib(date).add(hours, 'hour').toDate();
  }

  addDays(date: Date, days: number): Date {
    return this.lib(date).add(days, 'day').toDate();
  }

  toBoeFormat(date: Date): string {
    let year: number = date.getFullYear();
    let month: number = date.getMonth() + 1;
    let day: number = date.getDate();

    let YYYY: string = year.toString();
    // prefix with 0 if number is less than 10
    let MM: string = month < 10 ? '0' + month.toString() : month.toString();
    let DD: string = day < 10 ? '0' + day.toString() : day.toString();

    return `${YYYY}${MM}${DD}`;
  }

  isEqual(dateA: Date, dateB: Date): boolean {
    return this.lib(dateA).isSame(dateB);
  }

  isLeapYear(date: Date): boolean {
    throw new Error('Method not implemented.');
  }

  isBetween(start: Date, end: Date): boolean {
    throw new Error('Method not implemented.');
  }

  getDayOfMonth(date: Date): number {
    throw new Error('Method not implemented.');
  }

  getLastDateOfMonth(date: Date): number {
    throw new Error('Method not implemented.');
  }

  parseDate(date: number): Date {
    throw new Error('Method not implemented.');
  }

  toString(date: Date): string {
    throw new Error('Method not implemented.');
  }

  substractHours(date: Date, hours: number): Date {
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
