import * as authRepository from '../data/auth.js'
import bcrypt from 'bcrypt'

export async function createUser(req,res,next){
    const {username,password,name,email} = req.body
    const hashed = bcrypt.hashSync(password,10)
    const user = await authRepository.create(username,hashed,name,email)
    res.status(201).json(user)
}

export async function login(req,res,next){
    const {username,password} = req.body
    const user_pw = await authRepository.userCheck(username)
    const result =  bcrypt.compareSync(password,user_pw)
    if(result){
        res.status(201).json('로그인 성공')
    }else{res.status(400).json('로그인 실패')}
}