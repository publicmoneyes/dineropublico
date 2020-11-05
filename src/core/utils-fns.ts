import { preProcessFile } from 'typescript';
import { Contract } from '../models';
import { DateService } from '../services';
import { DT, DLContent, ContractContentApiModel, DD } from '../services/api-models';

const createDateCollection = (dateStart: Date, dateEnd: Date): Date[] => {
  const dateService: DateService = DateService.getInstance();
  let dateCollection: Date[] = [];

  let currentDate: Date = new Date(dateStart);
  while (dateService.isBefore(currentDate, dateEnd) || dateService.isEqual(currentDate, dateEnd)) {
    dateCollection.push(currentDate);

    currentDate = dateService.addDays(currentDate, 1);
  }

  return dateCollection;
};

const indexFinder = (indexList: DT, keyword: string): number => {
  let keywordIndex = -1;

  for (let index = 0; index < indexList.length; index++) {
    const item = indexList[index];

    if (item.indexOf(keyword) !== -1) {
      keywordIndex = index;
      break;
    }
  }
  return keywordIndex;
};

const normalizeString = (str: string, regexp: RegExp) => {
  let substr = str.replace(regexp, '');

  return substr.trim();
};

const doRecursion = <T>(contenido: DLContent, itemCreator: (item: DLContent) => T): T[] => {
  let total: T[] = [];

  if (contenido.dt && contenido.dt.length && typeof contenido.dd[0] === 'string') {
    total.push(itemCreator(contenido));
    return total;
  }

  for (const iterator of contenido.dd) {
    const element: DLContent = (iterator as ContractContentApiModel).dl[0];
    total = [...total, ...doRecursion(element, itemCreator)];
  }

  return total;
};

const isDistinctMinusOne = (value: any): boolean => value !== -1;

const findItemIndex = (item: string, normalizedContentCollection: string[], key: string): number => {
  let index = normalizedContentCollection.indexOf(item);
  if (index > -1 && item === key) {
    return index;
  }
  return -1;
};

const safeAccess = (collection: DD, index: number): string => {
  if (!collection || index < 0) {
    return '';
  }

  return (collection[index] as string) ?? '';
};

const getItemIndex = (indexCollection: number[]) => (indexCollection.length ? indexCollection.shift()! : -1);

const addressBuilder = (content: DD, indexCollection: number[]) => {
  if (!indexCollection || !indexCollection.length) {
    return '';
  }

  let [addrIndex, locIndex, provIndex, pcIndex, countryIndex] = indexCollection;

  let street = utils.safeAccess(content, addrIndex);
  let loc = utils.safeAccess(content, locIndex);
  let prov = utils.safeAccess(content, provIndex);
  let poscode = utils.safeAccess(content, pcIndex);
  let country = utils.safeAccess(content, countryIndex);

  return `${street} ${loc} ${prov} ${poscode} ${country}`.trim();
};

const copyObject = (object: any): any => {
  if (object) {
    return JSON.parse(JSON.stringify(object));
  }

  return undefined;
};

const objectInformationPercentage = (contract: any): number => {
  if (isUndefined(contract)) {
    return 0;
  }

  let totalProps: number = countNumberOfProps(contract);
  let undefinedProps: number = countNumberOfUndefinedProps(contract);
  let definedProps = totalProps - undefinedProps;

  return undefinedProps === 0 ? 100 : Math.round((definedProps * 100) / totalProps);
};

export const isObject = (o: any) => {
  return typeof o === 'object';
};

const isNullOrEmpty = (o: any) => {
  return o === null || Object.keys(o).length === 0;
};

const countNumberOfProps = (object: any): number => {
  let numberOfProps: number = 0;

  for (let key in object) {
    let prop = object[key];

    if (isObject(prop) && !isNullOrEmpty(prop)) {
      numberOfProps += Array.isArray(prop) ? 1 : countNumberOfProps(prop);
    } else {
      numberOfProps++;
    }
  }

  return numberOfProps;
};

const countNumberOfUndefinedProps = (object: any): number => {
  let numberOfProps: number = 0;

  for (let key in object) {
    let prop = object[key];

    if (isObject(prop) && !Array.isArray(prop)) {
      numberOfProps += isUndefined(prop) ? 1 : countNumberOfUndefinedProps(prop);
    } else {
      numberOfProps += isUndefined(prop) ? 1 : 0;
    }
  }

  return numberOfProps;
};

const isUndefined = (object: any): boolean => {
  if (object === undefined || object === null) return true;
  if (Array.isArray(object) && object.length == 0) return true;
  if (isObject(object) && Object.keys(object).length == 0) return true;

  return false;
};

const splitIn = <T>(itemsPerGroup: number, collection: T[]): T[][] => {
  let copy = [...collection];
  let finalArray = [];

  var i, j;
  for (i = 0, j = copy.length; i < j; i += itemsPerGroup) {
    finalArray.push(copy.slice(i, i + itemsPerGroup));
  }

  return finalArray;
};

export const utils = {
  createDateCollection,
  indexFinder,
  normalizeString,
  doRecursion,
  isDistinctMinusOne,
  findItemIndex,
  safeAccess,
  getItemIndex,
  addressBuilder,
  copyObject,
  countNumberOfProps,
  countNumberOfUndefinedProps,
  objectInformationPercentage,
  splitIn,
};
