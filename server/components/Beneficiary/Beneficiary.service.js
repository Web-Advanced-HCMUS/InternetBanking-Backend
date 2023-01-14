import mongoose from 'mongoose';
import { errorMessage } from '../../utils/error.js';

import BeneficiaryModel from '../model/Beneficiary.model.js';
import APIError from '../../utils/APIError.js';

export async function getList(userId) {
  try {
    return await BeneficiaryModel.find({ userId });
  } catch (error) {
    throw new APIError(500, error.message);
  }
}

export async function insertOne(info) {
  try {
    return await BeneficiaryModel.create({ ...info, userId: new mongoose.Types.ObjectId(info.userId) });
  } catch (error) {
    throw new APIError(500, error.message);
  }
}

export async function updateOne(_id, info) {
  try {
    return await BeneficiaryModel.updateOne({ _id }, { ...info, userId: new mongoose.Types.ObjectId(info.userId) });
  } catch (error) {
    throw new APIError(500, error.message);
  }
}

export async function deleteOne(_id) {
  try {
    return await BeneficiaryModel.deleteOne({ _id });
  } catch (error) {
    throw new APIError(500, error.message);
  }
}
