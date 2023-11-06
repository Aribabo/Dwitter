import express from "express";
import {body} from 'express-validator' // post로 받은걸 가지고 데이터베이스에 넣기위해 body로 감싼 데이터 받아와서 처리(검증도 같이)
import {validate} from '../middleware/validator.js'
import {isAuth} from '../middleware/auth.js'
import * as authController from '../controller/auth.js'

const router = express.Router();

const validateCredential = [
    body('username').trim().notEmpty().withMessage('username은 반드시 입력해야합니다'),
    body('password').trim().isLength({min:4}).withMessage('password는 반드시 4자 이상이여야함'),
    validate // 에러나면 메세지 띄우고 아니면 다음으로 이동
]

const validateSignup = [
    ...validateCredential,
    body('name').notEmpty().withMessage('name은 반드시 입력'),
    body('email').isEmail().withMessage('email 형식 확인'),
    body('url').isURL().withMessage('url 형식 확인').optional({nullable:true,ckeckFalsy:true}), // null값 허용 및 값없을때 null로 처리
    validate
]
// 회원가입
router.post('/signup',validateSignup,authController.signup)
// 로그인
router.post('/login',validateCredential,authController.login)
// jwt 확인
router.get('/me',isAuth, authController.me) //따로 검증 x



export default router
