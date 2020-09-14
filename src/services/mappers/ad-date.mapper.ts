import { ContractApiModel, ContractContentApiModel } from '../api-models';
import { utils, AD_DATE } from '../../core';

export const adDateMapper = (contract: ContractApiModel): Date | undefined => {
  if (!contract || !contract.documento || !contract.documento.texto) {
    return undefined;
  }
  const {
    documento: { texto },
  } = contract;

  const content = utils.copyObject(texto[0]?.dl);

  if (content) {
    let indexList = [...content[0].dt];
    let contentList = [...content[0].dd];

    let contentIndex = utils.indexFinder(indexList, AD_DATE);
    let date: string | ContractContentApiModel = contentList[contentIndex];

    return parseDate(date as string);
  }

  return undefined;
};

// DD de MMMMM de YYYY.
const parseDate = (date: string): Date => {
  let dateParts = date.split(' ');

  let days: number = +dateParts[0];
  let month: number = months[dateParts[2]];
  let years: number = +dateParts[4].substring(0, 4);

  return new Date(Date.UTC(years, month, days));
};

const months: any = {
  enero: 0,
  febrero: 1,
  marzo: 2,
  abril: 3,
  mayo: 4,
  junio: 5,
  julio: 6,
  agosto: 7,
  septiembre: 8,
  octubre: 9,
  noviembre: 10,
  diciembre: 11,
};
