import { Awardees, awardeesFactory } from '../../models';
import { ContractApiModel, ContractContentApiModel, DLContent } from '../api-models';
import { utils, AWARDEES, doRecursion } from '../../core';

export const awardeesMapper = (contract: ContractApiModel): Awardees[] => {
  if (!contract || !contract.documento || !contract.documento.texto) {
    return [];
  }

  const {
    documento: { texto },
  } = contract;

  const content = texto.shift()?.dl;

  if (content) {
    let indexList = [...content[0].dt];
    let contentList = [...content[0].dd];

    let contentIndex = utils.indexFinder(indexList, AWARDEES);

    if (contentIndex === -1) {
      return [];
    }

    let awardees: DLContent = (contentList[contentIndex] as ContractContentApiModel).dl[0];
    let mapppedAwardees = doRecursion(awardees, awardeesFactory).filter((item) => item !== undefined) as Awardees[];
    return mapppedAwardees;
  }
  return [];
};
