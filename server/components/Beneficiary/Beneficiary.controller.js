import * as BeneficiaryService from './Beneficiary.service.js';

export async function getListBeneficiary(req, res, next) {
    try {
        const data = await BeneficiaryService.getList(req.params.customerId);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function insertOneBeneficiary(req, res, next) {
    try {
        const data = await BeneficiaryService.insertOne(req.body);

        return res.RH.success(data);
    } catch (error) {
        next(error);
    }
}

export async function updateOneBeneficiary(req, res, next) {
    try {
        const { modifiedCount } = await BeneficiaryService.updateOne(req.params.id, req.body);

        return res.RH.success({ modifiedCount });
    } catch (error) {
        next(error);
    }
}

export async function deleteOneBeneficiary(req, res, next) {
    try {
        const { deletedCount } = await BeneficiaryService.deleteOne(req.params.id);

        return res.RH.success({ deletedCount });
    } catch (error) {
        next(error);
    }
}
