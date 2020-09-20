import { Contract } from '../../models';

export interface ContractAdapter {
  save(contract: Contract): Promise<Contract | undefined>;
  saveMany(contracts: Contract[]): Promise<number>;
}
