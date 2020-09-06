import { OffersReceived, defaultOffersReceived } from '../../models';
import { ContractApiModel, ContractContentApiModel, DLContent } from '../api-models';
import { utils, LIST_ENUM, DOT_CHARS_SPACES, OFFERS_RECEIVED } from '../../core';

export const offersReceivedMapper = (contract: ContractApiModel): OffersReceived[] => {
  if (!contract || !contract.documento || !contract.documento.texto) {
    return [defaultOffersReceived()];
  }

  const {
    documento: { texto },
  } = contract;

  const content = texto.shift()?.dl;

  if (content) {
    const indexList = [...content[0].dt];
    const contentList = [...content[0].dd];
    const contentIndex = utils.indexFinder(indexList, OFFERS_RECEIVED);

    if (contentIndex === -1) {
      return [defaultOffersReceived()];
    }

    const offerValues: ContractContentApiModel = contentList[contentIndex] as ContractContentApiModel;
    const offersValuesContent: DLContent = { ...offerValues.dl[0] };

    // We have 2 possible cases here
    // 1st base case
    /*
    {
    "dt": [strings],
    "dd": [strings]
    }
     */
    if (typeof offersValuesContent.dd[0] === 'string') {
      return buildOffers(offersValuesContent.dt, offersValuesContent.dd as string[]);
    }

    //2nd case
    /*
    {
      dt: [strings],
      dd: DLContent (recursive structure)
    }
    */
    let mappedOfferValues: OffersReceived[] = [];
    for (let index = 0; index < offersValuesContent.dt.length; index++) {
      const key = offersValuesContent.dt[index];
      const dlContent = (offersValuesContent.dd[index] as ContractContentApiModel).dl[0];
      const costs: string[] = recursiveDDExtractor(dlContent);

      mappedOfferValues.push(...buildOffers([key], [costs[0]]));
    }

    return mappedOfferValues;
  }

  return [defaultOffersReceived()];
};

const buildOffers = (descriptions: string[], values: string[]): OffersReceived[] => {
  let offers: OffersReceived[] = [];

  for (let index = 0; index < descriptions.length; index++) {
    let desc = utils.normalizeString(descriptions[index], LIST_ENUM);
    // remove texts and puctuation characters
    let normalizedValue: string = utils.normalizeString(values[index], DOT_CHARS_SPACES);
    // replace comma with dot (for decimals)
    let total: number = +normalizedValue.replace(',', '.');
    offers.push({
      text: desc,
      total,
    });
  }

  return offers;
};

const recursiveDDExtractor = (data: DLContent): string[] => {
  const ddItem = data.dd[0];
  // base case: All dd items are strings
  if (typeof ddItem === 'string') {
    return [...(data.dd as string[])];
  }

  let add: string[] = [];
  for (const iterator of data.dd) {
    const recursiveItem = iterator as ContractContentApiModel;

    add.push(...recursiveDDExtractor(recursiveItem.dl[0]));
  }

  return add;
};
