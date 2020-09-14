import { ContractApiModel, ContractContentApiModel } from '../api-models';
import { authorityTypeFactory, ContractingAuthority, contractingAuthorityFactory, defaultContractingAuthority } from '../../models';
import { utils, CONTRACTING_AUTHORITY, CONTRACT_TYPE } from '../../core';

export const contractingAuthorityMapper = (contract: ContractApiModel): ContractingAuthority => {
  if (!contract || !contract.documento || !contract.documento.texto) {
    return defaultContractingAuthority();
  }

  const {
    documento: { texto },
  } = contract;

  const content = texto[0]?.dl;

  if (content) {
    let contractingAuthority = defaultContractingAuthority();
    let indexList = [...content[0].dt];
    let contentList = [...content[0].dd];

    let cAuthorityIndex = utils.indexFinder(indexList, CONTRACTING_AUTHORITY);
    let cTypeIndex = utils.indexFinder(indexList, CONTRACT_TYPE);

    if (cAuthorityIndex !== -1) {
      contractingAuthority = {
        ...contractingAuthority,
        ...contractingAuthorityFactory((contentList[cAuthorityIndex] as ContractContentApiModel).dl[0]),
      };
    }

    if (cTypeIndex !== -1) {
      contractingAuthority = {
        ...contractingAuthority,
        ...authorityTypeFactory((contentList[cTypeIndex] as ContractContentApiModel).dl[0]),
      };
    }

    return contractingAuthority;
  }

  return defaultContractingAuthority();
};
