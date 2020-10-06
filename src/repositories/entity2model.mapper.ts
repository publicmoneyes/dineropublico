import { ContractType } from '../data/schemas/schema.type';
import { Contract } from '../models';

export const mappContractTypeToContract = (cTypes: Pick<ContractType, 'id' | 'metadata' | 'content'>): Contract => ({
  id: cTypes.id,
  content: cTypes.content,
  metadata: cTypes.metadata,
});
