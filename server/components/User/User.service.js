import { errorMessage } from '../../utils/error.js';

import * as UserInfoModel from '../model/User.model.js';

export async function createUserService(body) {
  try {
    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}

export async function userLoginService() {
  try {
    return true;
  } catch (error) {
    return errorMessage(500, error.toString());
  }
}
