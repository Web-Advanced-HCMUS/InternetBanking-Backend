import md5 from 'md5';
import dotenv from 'dotenv';

dotenv.config();

export const genHmac = function (params, secretKey) {
    params.secretKey = secretKey;

    const sortKeys = [];
    for (const key in params) {
        if (key !== 'hmac') {
            sortKeys.push(key);
        }
    }

    sortKeys.sort();

    let paramsHolder = '';

    sortKeys.forEach((key) => {
        paramsHolder += key + params[key];
    });

    return md5(paramsHolder).toString();
};

console.log(genHmac({ time: 1672244384085, bankCode: 'FB88NCCA' }, 'TIMO_AUTHENTICATION_SERVER_SECRET_KEY_FB88NCCA'));

