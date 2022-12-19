import * as BeneficiaryService from './Beneficiary.service.js';

export async function getListBeneficiary(req, res) {
    try {
        const data = await BeneficiaryService.getList(req.params.id);

        return res.RH.success(data);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function insertOneBeneficiary(req, res) {
    try {
        const data = await BeneficiaryService.insertOne(req.body);

        return res.RH.success(data);
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function updateOneBeneficiary(req, res) {
    try {
        const { modifiedCount } = await BeneficiaryService.updateOne(req.params.id, req.body);

        return res.RH.success({ modifiedCount });
    } catch (error) {
        return res.RH.error(error);
    }
}

export async function deleteOneBeneficiary(req, res) {
    try {
        const { deletedCount } = await BeneficiaryService.deleteOne(req.params.id);

        return res.RH.success({ deletedCount });
    } catch (error) {
        return res.RH.error(error);
    }
}
