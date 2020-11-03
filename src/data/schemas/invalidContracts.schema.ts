import mongoose, { Schema } from 'mongoose';

const InvalidContractSchema = new Schema(
  {
    identifier: String,
  },
  {
    timestamps: true,
  }
);

export const InvalidContractModel = mongoose.model('invalid_contracts', InvalidContractSchema);
