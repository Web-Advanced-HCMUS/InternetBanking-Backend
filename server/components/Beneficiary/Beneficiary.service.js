import mongoose from 'mongoose';
import { errorMessage } from '../../utils/error.js';

import BeneficiaryModel from '../model/Beneficiary.model.js';

export async function getList(username) {
  try {
    return await BeneficiaryModel.find({ username });
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function insertOne(info) {
  try {
    return await BeneficiaryModel.create(info);
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function updateOne(id, info) {
  try {
    return await BeneficiaryModel.updateOne({ _id: id }, info);
  } catch (error) {
    return errorMessage(500, error);
  }
}

export async function deleteOne(id) {
  try {
    return await BeneficiaryModel.deleteOne({ _id: id });
  } catch (error) {
    return errorMessage(500, error);
  }
}
