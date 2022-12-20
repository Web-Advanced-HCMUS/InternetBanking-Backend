import mongoose from 'mongoose';
import { errorMessage } from '../../utils/error.js';

import BeneficiaryModel from '../model/Beneficiary.model.js';

export async function getList(customerId) {
  try {
    return await BeneficiaryModel.find({ customerId });
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function insertOne(info) {
  try {
    return await BeneficiaryModel.create({ ...info, userId: new mongoose.Types.ObjectId(info.userId) });
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function updateOne(_id, info) {
  try {
    return await BeneficiaryModel.updateOne({ _id }, { ...info, userId: new mongoose.Types.ObjectId(info.userId) });
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function deleteOne(_id) {
  try {
    return await BeneficiaryModel.deleteOne({ _id });
  } catch (error) {
    return errorMessage(500, error);
  }
}
