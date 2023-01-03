import md5 from 'md5';
import dotenv from 'dotenv';

dotenv.config();

export const genHmac = function (data, secretKey) {
    data.secretKey = secretKey;

    const keys = ['bankCode', 'time', 'secretKey'];
    const sortKeys = [];
    for (const key in data) {
        if (keys.includes(key)) {
            sortKeys.push(key);
        }
    }

    sortKeys.sort();

    const keyValues = [];

    sortKeys.forEach((key) => {
        keyValues.push(`${key}=${data[key]}`);
    });
    return md5(keyValues.join('&').toString()).toString();
};

console.log(genHmac({ time: 1672772290564, bankCode: 'FB88NCCA' }, 'TIMO_AUTHENTICATION_SERVER_SECRET_KEY_FB88NCCA'));
