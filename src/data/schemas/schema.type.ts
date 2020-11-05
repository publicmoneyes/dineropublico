import { Contract, InvalidContract } from '../../models';
import { Document } from 'mongoose';

export type ContractType = Contract & Document;
export type InvalidContractType = InvalidContract & Document;
