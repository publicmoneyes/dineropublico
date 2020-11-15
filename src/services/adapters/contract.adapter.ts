import { Observable } from 'rxjs';
import { Boe, Contract } from '../../models';

export interface ContractAdapter {
  findByDateRange(startDate: Date, endDate: Date): Promise<Contract[]>;
  findContractByBoeId(boeId: string): Promise<Contract | null>;
  getContractsById(boe: Boe): Observable<Contract[]>;
  saveMany(contracts: Contract[]): Promise<number>;
}
