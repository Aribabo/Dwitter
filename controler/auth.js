import * as authRepository from '../data/auth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const secret = 'abcdefg1234'
let token = {}
let token_2 = {}


async function tokenMake(id){
    token = jwt.sign({ 
            id,
            isAdmin : false
        },
        secret,
        { expiresIn : 90 },
        )
        return token
}

export async function createUser(req,res,next){
    const {username,password,name,email} = req.body
    const hashed = bcrypt.hashSync(password,10)
    const user = await authRepository.create(username,hashed,name,email)
    res.status(201).json(user)
}
async function getToken(req,res,next){
    token_2 = req.header['header']
}

export async function login(req,res,next){
    const {username,password} = req.body
    const user_pw = await authRepository.userCheck(username)
    const result =  bcrypt.compareSync(password,user_pw)
    if(result){
        res.status(201).header('Token', tokenMake(username)).json('로그인 성공')
        getToken()
        console.log(token_2)
        // 토큰발행 및 리턴
    }else{res.status(400).json('로그인 실패')}

}

export async function jwtToken(req,res,next){
    console.log(req.header)
}

