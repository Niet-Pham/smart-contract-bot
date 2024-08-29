import mongoose from 'mongoose';
import { Contracts, ContractSchema } from '../entities/contracts.entity';

export const saveContract = async (contract: ContractSchema): Promise<ContractSchema> => {
  try {
    contract.id = new mongoose.Types.ObjectId().toString()
    return await contract.save();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const findContractById = async (
  id: string,
): Promise<ContractSchema> => {
  try {
    return await Contracts.findById({ id });
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// const findContractById = async (
//   id: string,
// ): Promise<ContractSchema> => {
//   try {
//     return await Contracts.find({ id });
//   } catch (error) {
//     console.log(error);
//     throw new Error(error);
//   }
// };

export const countRecord = async (
): Promise<Number> => {
  try {
    return await Contracts.countDocuments();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
