import * as userRepository from '../data/auth.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {config} from '../config.js'


export async function signup(req,res){
    const {username,password,name,email,url} = req.body
    const found = await userRepository.findByUsername(username)
    if(found){
        return res.status(409).json({message: `${username}이 이미 존재함`}) // 중복은 보통 409
    }
    const hashed = await bcrypt.hashSync(password,config.bcrypt.saltRounds)
    const userId = await userRepository.createUser({
        username,
        password:hashed,
        name,
        email,
        url
    })
    const token = createJwtToken(userId)
    res.status(201).json({token,username}) //가입은 보통 201
}
export function createJwtToken(id){
    return jwt.sign({id},config.jwt.secretKey,{expiresIn:config.jwt.expiresInSec})
}

export async function me(req,res,next){
    const user = await userRepository.findById(req.userId)
    if(!user){
        return res.status(404).json({message:`사용자를 찾을 수 없음`})
    }
    res.status(200).json({token:req.token, username : user.username})

}
export async function login(req,res){
    const {username,password} = req.body
    const user = await userRepository.findByUsername(username)
    if (!user){
        return res.status(401).json({message: '없는 아이디입니다'})
    }
    const isValidPassword =  bcrypt.compareSync(password,user.password) // compareSync는 동기식 compare는 비동기식 compare 쓰고싶으면 앞에 await 붙이기
    if(!isValidPassword){
        return res.status(401).json({message: '틀린 비밀번호입니다'})
        } 
        const token = createJwtToken(user.id)
        res.status(200).json({token,username})
    
}


