import { utils, CPV_CODE } from '../../core';
import { Details, defaultDetails } from '../../models';
import { ContractApiModel, ContractContentApiModel } from '../api-models';

export const detailsMapper = (contract: ContractApiModel): Details => {
  if (!contract || !contract.documento || !contract.documento.texto) {
    return defaultDetails();
  }

  const {
    documento: { texto },
  } = contract;

  const content = texto[0]?.dl;

  if (content) {
    let indexList = [...content[0].dt];
    let contentList = [...content[0].dd];

    let contentIndex = utils.indexFinder(indexList, CPV_CODE);
    let details: string | ContractContentApiModel = contentList[contentIndex];
    // at this time the details can be an array of strings or a ContractContentApiModel
    if (typeof details === 'string') {
      return [details];
    }

    return (details as ContractContentApiModel).dl[0].dd as string[];
  }

  return defaultDetails();
};
