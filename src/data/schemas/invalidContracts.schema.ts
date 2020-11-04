import mongoose, { Schema } from 'mongoose';
import { InvalidContractType } from './schema.type';

const InvalidContractSchema = new Schema<InvalidContractType>(
  {
    identifier: String,
  },
  {
    timestamps: true,
  }
);

export const InvalidContractModel = mongoose.model<InvalidContractType>('invalid_contract', InvalidContractSchema);
