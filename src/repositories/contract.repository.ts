import { ContractModel, ContractType } from '../data/schemas/contract.schema';
import { Contract, defaultContract } from '../models';
import { LoggerService } from '../services';
import { ContractAdapter } from './adapters/contract.adapter';
import { modelToContractMapper } from './entity2model.mapper';

export class ContractRepository implements ContractAdapter {
  private static instance: ContractRepository;
  private logger: LoggerService;

  private constructor() {
    this.logger = LoggerService.getInstance();
  }

  static getInstance(): ContractRepository {
    if (!ContractRepository.instance) {
      ContractRepository.instance = new ContractRepository();
    }

    return ContractRepository.instance;
  }

  async save(contract: Contract): Promise<Contract | undefined> {
    try {
      const contractModel: ContractType = new ContractModel({ ...contract });
      const savedContract: ContractType = await contractModel;

      this.logger.debug(`Saved contract '${savedContract._id}'`);

      return modelToContractMapper(savedContract);
    } catch (error) {
      this.logger.error(`Error while saving a contract :${error}`);
      return undefined;
    }
  }

  async saveMany(contracts: Contract[]): Promise<number> {
    // An array of _id for each successfully inserted documents
    try {
      let insertedIds = await ContractModel.insertMany(contracts);

      this.logger.debug(`Saved ${insertedIds.length} contracts`);

      return insertedIds.length;
    } catch (error) {
      this.logger.error(`Error while saving many contracts :${error}`);
      return -1;
    }
  }
}
