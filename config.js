import dotenv from 'dotenv'
dotenv.config()
// 코드 안에 시크릿키나 호스트번호를 직접 작성하는 것은 좋지 않음으로 여기에 다 넣어서 사용

function required(key,defaultValue=undefined){
    const value = process.env[key] || defaultValue // process.env[key]가 있으면 얘가 들어가고 없으면 defaultValue가 들어감
    if (value == null){
        throw new Error(`key ${key} is undefined`)
    }
    return value
}

export const config = {
    jwt : {
        secretKey: required('JWT_SECRET'),
        expiresInSec : parseInt(required('JWT_EXPIRES_SEC',172800)) // JWT_EXPIRES_SEC가 없으면(못불러오면) 172800이 들어가게 처리
    },
    bcrypt:{
        saltRounds : parseFloat(required('BCRYPT_SALT_ROUNDS',12))
    },
    host:{
        port : parseFloat(required('HOST_PORT',8080))
    }
}