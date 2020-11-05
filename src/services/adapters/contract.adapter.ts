import { Observable } from 'rxjs';
import { Boe, Contract } from '../../models';

export interface ContractAdapter {
  findByDateRange(startDate: Date, endDate: Date): Promise<Contract[]>;
  getContractsById(boe: Boe): Observable<Contract[]>;
  saveMany(contracts: Contract[]): Promise<number>;
}
