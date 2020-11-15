import { Contract, InvalidContract } from '../../models';

export interface ContractAdapter {
  save(contract: Contract): Promise<Contract | undefined>;
  saveMany(contracts: Contract[]): Promise<number>;
  findByDateRange(start: Date, end: Date): Promise<Contract[]>;
  findByBoeId(boeId: string): Promise<Contract | null>;
  saveInvalidContracts(invalidContract: InvalidContract[]): Promise<number>;
}
