import { Document } from 'mongoose';

export interface BoeDocument extends Document {
  contractIdCollection: string[];
}
