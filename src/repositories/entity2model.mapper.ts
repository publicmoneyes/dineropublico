import { ContractType } from '../data/schemas/schema.type';
import { Contract } from '../models';

export const mappContractTypeToContract = (cTypes: Pick<ContractType, '_id' | 'metadata' | 'content'>): Contract => ({
  id: cTypes._id,
  content: cTypes.content,
  metadata: cTypes.metadata,
});
