import { ContractType } from '../data/schemas/contract.schema';
import { Contract } from '../models';

export const modelToContractMapper = (model: ContractType): Contract => {
  const { id, content, metadata } = model;

  return {
    id,
    content,
    metadata,
  };
};
