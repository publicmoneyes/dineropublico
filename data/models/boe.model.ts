import { Document } from 'mongoose';

export interface Boe extends Document {
  contractIdCollection: string[];
}
