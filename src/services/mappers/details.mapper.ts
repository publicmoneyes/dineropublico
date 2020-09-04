import { Details, defaultDetails } from '../../models';
import { ContractApiModel, DLContent, ContractContentApiModel } from '../api-models';
import { DESCRIPTION, utils } from '../../core';

export const detailsMapper = (contract: ContractApiModel): Details => {
  if (!contract || !contract.documento || !contract.documento.texto) {
    return defaultDetails();
  }

  const {
    documento: { texto },
  } = contract;

  const content = texto.shift()?.dl;

  if (content) {
    let indexList = [...content[0].dt];
    let contentList = [...content[0].dd];

    let contentIndex = utils.indexFinder(indexList, DESCRIPTION);
    let details: string | ContractContentApiModel = contentList[contentIndex];
    // at this time the details can be an array of strings or a ContractContentApiModel
    if (typeof details === 'string') {
      return [details];
    }

    return (details as ContractContentApiModel).dl[0].dd as string[];
  }

  return defaultDetails();
};
