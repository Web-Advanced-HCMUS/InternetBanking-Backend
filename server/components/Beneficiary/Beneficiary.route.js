import { Router } from 'express';
import * as BeneficiaryController from './Beneficiary.controller.js';

const router = new Router();

router.get('/get-list/:id', BeneficiaryController.getListBeneficiary);
router.post('/insert-one', BeneficiaryController.insertOneBeneficiary);
router.put('/update-one/:id', BeneficiaryController.updateOneBeneficiary);
router.delete('/delete-one/:id', BeneficiaryController.deleteOneBeneficiary);

export default router;
