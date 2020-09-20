import mongoose, { Schema, Document } from 'mongoose';
import { Contract } from '../../models';

export type ContractType = Contract & Document;

const ContractSchema: Schema<ContractType> = new Schema<ContractType>(
  {
    metadata: {
      identifier: String,
      department: String,
      diary: Number,
      date: Date,
      title: String,
      section: String,
      pdfUrl: String,
    },
    content: {
      contractAuthority: {
        name: String,
        nif: String,
        address: String,
        telephone: String,
        email: String,
        web: String,
        activityType: String,
        activity: String,
      },
      details: [String],
      description: [String],
      offersReceived: [
        {
          text: String,
          total: Number,
        },
      ],
      awardees: [
        {
          name: String,
          nif: String,
          address: String,
          pyme: Boolean,
        },
      ],
      offerValues: [
        {
          value: Number,
          text: String,
        },
      ],
      date: Date,
    },
  },
  {
    timestamps: true,
    typePojoToMixed: false,
  }
);

export const ContractModel = mongoose.model<ContractType>('Contract', ContractSchema);
