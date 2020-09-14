export interface ContractAdapter {
  findContractsByDate(date: Date): any;
  findContractsByDateRange(startDate: Date, endDate: Date): any[];
  saveContract(contract: any): any;
  saveManyContracta(contracts: any[]): any[];
}
