import { OffersValues, defaultOfferValue } from '../../models';
import { ContractApiModel, ContractContentApiModel, DLContent } from '../api-models';
import { OFFERS_VALUE, utils, LIST_ENUM, DOT_CHARS_SPACES } from '../../core';

export const offersValuesMapper = (contract: ContractApiModel): OffersValues[] => {
  if (!contract || !contract.documento || !contract.documento.texto) {
    return [defaultOfferValue()];
  }

  const {
    documento: { texto },
  } = contract;

  const content = texto.shift()?.dl;

  if (content) {
    const indexList = [...content[0].dt];
    const contentList = [...content[0].dd];

    const contentIndex = utils.indexFinder(indexList, OFFERS_VALUE);
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
    let mappedOfferValues: OffersValues[] = [];
    for (let index = 0; index < offersValuesContent.dt.length; index++) {
      const key = offersValuesContent.dt[index];
      const dlContent = (offersValuesContent.dd[index] as ContractContentApiModel).dl[0];
      const costs: string[] = recursiveExtractor(dlContent);
      let descriptions: string[] = costs.map((c) => key);

      mappedOfferValues.push(...buildOffers(descriptions, costs));
    }

    return mappedOfferValues;
  }

  return [defaultOfferValue()];
};

const buildOffers = (descriptions: string[], values: string[]): OffersValues[] => {
  let offers: OffersValues[] = [];

  for (let index = 0; index < descriptions.length; index++) {
    let desc = utils.normalizeString(descriptions[index], LIST_ENUM);
    // remove texts and puctuation characters
    let normalizedValue: string = utils.normalizeString(values[index], DOT_CHARS_SPACES);
    // replace comma with dot (for decimals)
    let value: number = +normalizedValue.replace(',', '.');
    offers.push({
      text: desc,
      value,
    });
  }

  return offers;
};

const recursiveExtractor = (data: DLContent): string[] => {
  const ddItem = data.dd[0];
  // base case: All dd items are strings
  if (typeof ddItem === 'string') {
    return [...(data.dd as string[])];
  }

  let add: string[] = [];
  for (const iterator of data.dd) {
    const recursiveItem = iterator as ContractContentApiModel;

    add.push(...recursiveExtractor(recursiveItem.dl[0]));
  }

  return add;
};
