import { DateService } from '../services';

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

export const utils = {
  createDateCollection,
};
