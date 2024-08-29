import mongoose, { Document, Schema } from 'mongoose';

export interface ContractSchema extends Document {
  id: string;
  abi: string;
  address?: string;
}

export const contractSchema: Schema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    abi: { type: String, required: true, },
    address: { type: String, },
  },
  { timestamps: true },
);

export const Contracts = mongoose.model<ContractSchema>('contracts', contractSchema);
