import dotenv from 'dotenv';
dotenv.config();
function required( key, defaultValue=undefined) {
    const value = process.env[key] || defaultValue; // || : or. 앞의 값이 있으면 우선 순위로 앞의 값이 들어가고 값이 없으면 뒤에 값이 들어감.
    if (value == null) {
        throw new Error(`Key ${key} is undefined`);
    }
    return value;
}
export const config = {
    jwt: {
        secretKey: required('JWT_SECRET'),
        expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 172800))
        // 172800이 defaultValue 값으로 들어감.
    },
    bcrypt: {
        saltRounds: parseInt(required('BCRYPT_SALT_ROUNDS', 12))
    },
    host: {
        port: parseInt(required('HOST_PORT', 8080))
    },
    db: {
        host: required('DB_HOST'),
        // user: required('DB_USER'),
        // database: required('DB_DATABASE'),
        // password: required('DB_PASSWORD')
    }
}