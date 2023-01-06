import * as AdminService from './Admin.service.js';
import * as UserService from '../User/User.service.js';

export async function createEmployeeAccountController(req, res) {
  try {
    const { auth, body } = req;
    const payload = await UserService.createUserService(auth, body);

    return res.RH.success(payload);
  } catch (error) {
    return res.RH.error(error);
  }
}
