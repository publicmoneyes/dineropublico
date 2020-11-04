import { ContractRepository } from './contract.repository';
import { ContractModel } from '../data/schemas/contract.schema';
import { defaultContract, InvalidContract } from '../models';
import { ContractType } from '../data/schemas/schema.type';
import { InvalidContractModel } from '../data/schemas/invalidContracts.schema';

jest.mock('../data/schemas/contract.schema.ts');
jest.mock('../data/schemas/invalidContracts.schema.ts');

describe('Contract repository specs', () => {
  let repository: ContractRepository = ContractRepository.getInstance();

  beforeAll(() => {
    ContractModel.insertMany = jest.fn().mockImplementation(() => Promise.resolve(['', '']));
    InvalidContractModel.insertMany = jest.fn().mockImplementation(() => Promise.resolve(['']));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates a contract', async () => {
    const contractModel: ContractType = new ContractModel({ ...defaultContract() });

    jest.spyOn(contractModel, 'save').mockResolvedValue({ ...defaultContract(), id: '1' } as ContractType);

    const savedItem = await repository.save(defaultContract());
    expect(savedItem?.id).toEqual('1');
  });

  it('creates many contracts', (done) => {
    repository.saveMany([defaultContract(), defaultContract()]).then((savedItem) => {
      expect(savedItem).toEqual(2);
      done();
    });
  });

  it('finds contracts by date range', (done) => {
    const contractModel: ContractType = new ContractModel({ ...defaultContract() });

    jest.spyOn(ContractModel, 'find').mockResolvedValue([contractModel]);

    repository.findByDateRange(new Date(), new Date()).then((r) => {
      expect(r).toHaveLength(1);
      done();
    });
  });

  it('saves invalid contracts', async () => {
    const invalidContracts: InvalidContract[] = [
      {
        identifier: 'irrelevant url',
      },
    ];
    const savedContracts = await repository.saveInvalidContracts(invalidContracts);
    expect(savedContracts).toBe(1);
  });
});
