import { utils } from '../../core';
import { Contract, defaultContract } from '../../models';
import { ContractApiModel } from '../api-models';
import { contractContentMapper } from './contractContent.mapper';
import { metadataMapper } from './metadata.mapper';

export const contractMapper = (contract: ContractApiModel): Contract => {
  let mappedContract = defaultContract();

  if (!contract) {
    return mappedContract;
  }

  mappedContract.content = contractContentMapper(contract);
  mappedContract.metadata = metadataMapper(contract);

  return mappedContract;
};
