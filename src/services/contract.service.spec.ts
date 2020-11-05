import { of } from 'rxjs';
import { Boe, Contract, defaultContract, defaultContractContent, defaultMetadata } from '../models';
import { ContractRepository } from '../repositories/contract.repository';
import { ContractService } from './contract.service';
import { DateService } from './date.service';

describe('Contract service specs', () => {
  const dateService: DateService = DateService.getInstance();
  const contractRepository: ContractRepository = ContractRepository.getInstance();
  const contractService: ContractService = ContractService.getInstance();

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  describe('Communication with repository', () => {
    it('throws error if date is undefined', (done) => {
      // Arrange
      jest.spyOn(dateService, 'isBefore').mockReturnValue(true);

      // Act
      contractService
        .findByDateRange(new Date(), new Date())
        .then((r) => fail())
        .catch((err) => {
          expect(err).toStrictEqual(new Error('Invalid date'));
          done();
        });
    });

    it('should retrieve a collection of contracts by a given date range', async () => {
      // Arrange
      jest.spyOn(dateService, 'isBefore').mockReturnValue(false);
      jest
        .spyOn(contractRepository, 'findByDateRange')
        .mockResolvedValue([{ id: '1', content: defaultContractContent(), metadata: defaultMetadata() }]);

      // Act
      const contracts: Contract[] = await contractService.findByDateRange(new Date(), new Date());
      // Assert
      expect(contracts[0].id).toEqual('1');
    });
  });

  describe('Communication with boe api', () => {
    it('should return a collection of mapped contract from the api', (done) => {
      // Arrange
      jest.spyOn(contractService, 'getContractsById').mockReturnValue(of([defaultContract()]));
      const boe: Boe = {
        contractIdCollection: [],
      };

      // Act
      contractService.getContractsById(boe).subscribe((r) => {
        expect(r[0]).toStrictEqual(defaultContract());
        done();
      });
    });

    it('should save to the db the given contract collection', (done) => {
      // Arrange
      jest.spyOn(contractRepository, 'saveMany').mockReturnValue(Promise.resolve(1));
      jest.spyOn(contractRepository, 'saveInvalidContracts').mockReturnValue(Promise.resolve(1));

      // Act
      contractService.saveMany([defaultContract()]).then((r) => {
        expect(r).toEqual(1);
        done();
      });
    });
  });
});
