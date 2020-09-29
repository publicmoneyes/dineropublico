import { ContractRepository } from './contract.repository';
import { ContractModel, ContractType } from '../data/schemas/contract.schema';
import { defaultContract, defaultContractContent, defaultMetadata } from '../models';

jest.mock('../data/schemas/contract.schema.ts');

describe('Contract repository specs', () => {
  const repository = ContractRepository.getInstance();

  it('creates a contract', (done) => {
    const contractModel: ContractType = new ContractModel({ ...defaultContract() });
    const spy = jest.spyOn(contractModel, 'save');
    spy.mockResolvedValue({ ...defaultContract(), id: '1' } as ContractType);

    repository.save(defaultContract()).then((savedItem) => {
      expect(savedItem?.id).toEqual('1');
      done();
    });
  });

  it.only('creates many contracts', (done) => {
    const contractModel: ContractType = new ContractModel({ ...defaultContract() });
    const spy = jest.spyOn(ContractModel, 'insertMany');

    spy.mockResolvedValue(contractModel);

    // spy.mockImplementation(() => {
    //   return Promise.resolve(['irrelevant', 'irrelevant']);
    // });

    //spy.mockResolvedValue(contractModel);

    repository.saveMany([defaultContract(), defaultContract()]).then((savedItem) => {
      console.log('savedItem', savedItem);
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
});
