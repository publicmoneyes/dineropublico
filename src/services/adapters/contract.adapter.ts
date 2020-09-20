import { Contract } from '../../models';

export interface ContractAdapter {
  findByDate(date: Date): Contract;
  findByDateRange(startDate: Date, endDate: Date): Contract[];

  save(contract: Contract): Contract;
  saveMany(contracts: Contract[]): number;
}
