import express from "express";
import {body} from 'express-validator'
import * as authController from '../controler/auth.js'
import {validate} from '../middleware/validator.js'
/*
    회원가입
    router.post('/signup', ....)

    로그인 -> post로 json으로 보냈을때 
    router.post('/login', ....)

    jwt 확인 -> 모든 페이지를 돌아다닐때 expire됐는지 확인하고 댕김
    router.get('/me', ....)
*/

const router = express.Router();

router.post('/signup',authController.createUser)
router.post('/login',authController.login)
// router.post('/jwt',authController.singup)

export default router