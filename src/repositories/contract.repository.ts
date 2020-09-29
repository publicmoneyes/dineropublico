import { MongooseFilterQuery } from 'mongoose';
import { ContractModel, ContractType } from '../data/schemas/contract.schema';
import { Contract } from '../models';
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
      const savedContract: ContractType = await contractModel.save();

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
      let insertedIds: ContractType[] = await ContractModel.insertMany(contracts);

      this.logger.debug(`Saved ${insertedIds.length} contracts`);

      return insertedIds.length;
    } catch (error) {
      this.logger.error(`Error while saving many contracts :${error}`);
      return -1;
    }
  }

  async findByDateRange(dateStart: Date, dateEnd: Date): Promise<Contract[]> {
    let query: MongooseFilterQuery<Contract> = {
      'metadata.date': {
        $gte: dateStart,
        $lte: dateEnd,
      },
    };

    const foundContract: Pick<ContractType, '_id' | 'metadata' | 'content'>[] | null = await ContractModel.find(query);

    return foundContract ? foundContract.map(mappContractTypeToContract) : [];
  }
}

const mappContractTypeToContract = (cTypes: Pick<ContractType, '_id' | 'metadata' | 'content'>): Contract => ({
  id: cTypes._id,
  content: cTypes.content,
  metadata: cTypes.metadata,
});
