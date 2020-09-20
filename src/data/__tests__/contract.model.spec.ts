import { defaultContract, defaultMetadata } from '../../models';
import { DatabaseHandler } from '../config.db';
import { ContractModel } from '../schemas/contract.schema';

describe('Contract Model specs', () => {
  let dbHandler = DatabaseHandler.getInstance();

  beforeAll(async () => {
    await dbHandler.connect();
  });

  afterAll(async () => {
    await dbHandler.disconnect();
  });

  afterEach(async () => {
    await ContractModel.deleteMany({});
  });

  it('saves a contract', async () => {
    let contract = new ContractModel({ ...defaultContract() });
    let savedConctract = await contract.save();

    expect(savedConctract._id).toBeTruthy();
  });

  it('find a contract by id', async () => {
    // Arrage
    let contract = new ContractModel({ ...defaultContract() });
    let savedConctract = await contract.save();

    // Act
    let contractFound = await ContractModel.findById(savedConctract._id);

    // Assert
    expect(contractFound).toStrictEqual(savedConctract);
  });

  it('removes a contract', async () => {
    // Arrage
    let contract = new ContractModel({ ...defaultContract() });
    let savedConctract = await contract.save();

    // Act
    let totalDocumentsBeforeDelete = await ContractModel.countDocuments().exec();
    await ContractModel.findByIdAndDelete(savedConctract._id);
    let totalDocumentsAfterDelete = await ContractModel.countDocuments().exec();

    // Assert
    expect(totalDocumentsBeforeDelete).toBe(1);
    expect(totalDocumentsAfterDelete).toBe(0);
  });
});
