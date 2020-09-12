import { DateService } from '../services';
import { DT, DLContent, ContractContentApiModel } from '../services/api-models';

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

export const doRecursion = <T>(contenido: DLContent, itemCreator: (item: DLContent) => T): T[] => {
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

export const utils = {
  createDateCollection,
  indexFinder,
  normalizeString,
  doRecursion,
};
