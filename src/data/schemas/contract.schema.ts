import mongoose, { Schema, Document } from 'mongoose';
import { Contract } from '../../models';

type ContractType = Contract & Document;

const ContractSchema: Schema<ContractType> = new Schema<ContractType>(
  {
    metadata: Object,
    content: Object,
  },
  {
    timestamps: true,
  }
);

export const ContractModel = mongoose.model<ContractType>('Contract', ContractSchema);
