import { DateService } from './date.service';

describe('Date service specs', () => {
  let dateService: DateService = DateService.getInstance();
  // isLeapYear(date: Date): boolean;
  // isBetween(start: Date, end: Date): boolean;
  // isBefore(first: Date, second: Date): boolean;
  it('isBefore', () => {
    let after = new Date(Date.UTC(2020, 0, 1));
    let before = new Date(Date.UTC(2020, 0, 2));

    expect(dateService.isBefore(after, before)).toBeTruthy();
    expect(dateService.isBefore(before, after)).toBeFalsy();
  });

  it('isAfter', () => {
    let after = new Date(Date.UTC(2020, 0, 2));
    let before = new Date(Date.UTC(2020, 0, 1));

    expect(dateService.isAfter(after, before)).toBeTruthy();
    expect(dateService.isAfter(before, after)).toBeFalsy();
  });

  it('toBoeFormat', () => {
    let date = new Date(Date.UTC(2020, 4, 15));

    expect(dateService.toBoeFormat(date)).toEqual('20200515');
  });

  it('addDays', () => {
    let date = new Date(Date.UTC(2020, 4, 15));
    let dateAdded = new Date(Date.UTC(2020, 4, 18));
    let dateAddedNextMonth = new Date(Date.UTC(2020, 5, 1));

    expect(dateService.addDays(date, 3)).toEqual(dateAdded);
    expect(dateService.addDays(date, 17)).toEqual(dateAddedNextMonth);
  });
  // getDayOfMonth(date: Date): number;
  // getMonth(date: Date): number;
  // getYear(date: Date): number;
  // getLastDateOfMonth(date: Date): number;
  // getHours(date: Date): number;
  // parseDate(date: number): Date;
  // toString(date: Date): string;
  // addHours(date: Date, hours: number): Date;
  // substractHours(date: Date, hours: number): Date;
  // substractDays(date: Date, days: number): Date;
  // substractMonths(date: Date, months: number): Date;
  // setDateToStart(date: Date): Date;
  // setDateToEnd(date: Date): Date;
});
