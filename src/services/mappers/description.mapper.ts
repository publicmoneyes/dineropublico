import { DESCRIPTION, utils } from '../../core';
import { defaultDescription, Description } from '../../models';
import { ContractApiModel, ContractContentApiModel } from '../api-models';

export const descriptionMapper = (contract: ContractApiModel): Description => {
  if (!contract || !contract.documento || !contract.documento.texto) {
    return defaultDescription();
  }

  const {
    documento: { texto },
  } = contract;

  const content = texto.shift()?.dl;

  if (content) {
    let indexList = [...content[0].dt];
    let contentList = [...content[0].dd];

    let contentIndex = utils.indexFinder(indexList, DESCRIPTION);
    let description: string | ContractContentApiModel = contentList[contentIndex];
    // at this time the description can be an array of strings or a ContractContentApiModel
    if (typeof description === 'string') {
      return [description];
    }

    return (description as ContractContentApiModel).dl[0].dd as string[];
  }

  return defaultDescription();
};
