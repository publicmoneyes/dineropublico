import { DateService } from './date.service';

describe('Date service specs', () => {
  let dateService: DateService = DateService.getInstance();
  // isLeapYear(date: Date): boolean;
  // isBetween(start: Date, end: Date): boolean;
  // isBefore(first: Date, second: Date): boolean;
  it('isBefore', () => {
    let date1 = new Date(2020, 0, 1, 15, 0);
    let date2 = new Date(2020, 0, 1, 16, 0);

    expect(dateService.isBefore(date1, date2)).toBeTruthy();
    expect(dateService.isBefore(date2, date1)).toBeFalsy();
  });
  // isAfter(first: Date, second: Date): boolean;
  // getDayOfMonth(date: Date): number;
  // getMonth(date: Date): number;
  // getYear(date: Date): number;
  // getLastDateOfMonth(date: Date): number;
  // getHours(date: Date): number;
  // parseDate(date: number): Date;
  // toString(date: Date): string;
  // addHours(date: Date, hours: number): Date;
  // substractHours(date: Date, hours: number): Date;
  // addDays(date: Date, days: number): Date;
  // substractDays(date: Date, days: number): Date;
  // substractMonths(date: Date, months: number): Date;
  // setDateToStart(date: Date): Date;
  // setDateToEnd(date: Date): Date;
});
