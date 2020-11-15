import { MongooseFilterQuery } from 'mongoose';
import { ContractModel } from '../data/schemas/contract.schema';
import { InvalidContractModel } from '../data/schemas/invalidContracts.schema';
import { ContractType } from '../data/schemas/schema.type';
import { Contract, InvalidContract } from '../models';
import { LoggerService } from '../services';
import { ContractAdapter } from './adapters/contract.adapter';
import { mappContractTypeToContract } from './entity2model.mapper';

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

      return mappContractTypeToContract(savedContract);
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

    const foundContract: Pick<ContractType, 'id' | 'metadata' | 'content'>[] | null = await ContractModel.find(query);

    return foundContract ? foundContract.map(mappContractTypeToContract) : [];
  }

  async saveInvalidContracts(invalidContracts: InvalidContract[]): Promise<number> {
    try {
      const insertedIdentifiers = await InvalidContractModel.insertMany(invalidContracts);
      this.logger.debug(`Saved ${insertedIdentifiers.length} contracts`);
      return insertedIdentifiers.length;
    } catch (error) {
      this.logger.error(`Error while saving many invalid contracts :${error}`);
      return -1;
    }
  }

  async findByBoeId(boeId: string): Promise<Contract | null> {
    try {
      let query: MongooseFilterQuery<Contract> = {
        'metadata.identifier': boeId,
      };
      const contract = await ContractModel.findOne(query);
      return contract ? mappContractTypeToContract(contract) : null;
    } catch (error) {
      this.logger.error(`Error while saving many invalid contracts :${error}`);
      return null;
    }
  }
}
