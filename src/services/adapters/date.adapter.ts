export interface DateAdapter {
  isLeapYear(date: Date): boolean;
  isBetween(start: Date, end: Date): boolean;
  isBefore(first: Date, second: Date): boolean;
  isAfter(first: Date, second: Date): boolean;
  getDayOfMonth(date: Date): number;
  getMonth(date: Date): number;
  getYear(date: Date): number;
  getLastDateOfMonth(date: Date): number;
  getHours(date: Date): number;
  parseDate(date: number): Date;
  toString(date: Date): string;
  addHours(date: Date, hours: number): Date;
  substractHours(date: Date, hours: number): Date;
  addDays(date: Date, days: number): Date;
  substractDays(date: Date, days: number): Date;
  substractMonths(date: Date, months: number): Date;
  setDateToStart(date: Date): Date;
  setDateToEnd(date: Date): Date;
  toBoeFormat(date: Date): string;
}
