import { Contract } from '../../models';
import { Document } from 'mongoose';

export type ContractType = Contract & Document;
