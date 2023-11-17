import express from "express";
import morgan from "morgan";
import tweetsRouter from './router/tweets.js'
import authRouter from './router/auth.js'
import {config} from './config.js'
import cors from 'cors'
import { initSocket } from "./connection/socket.js";
import { connectDB } from "./db/database.js";


console.log(process.env.JWT_SECRET)
const app = express()

//미들웨어
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())

// 라우터
app.use('/Tweets',tweetsRouter)
app.use('/auth',authRouter)

app.use((req,res,next)=>{
    res.sendStatus(404)
});

connectDB().then(()=>{
    const server = app.listen(config.host.port)
    initSocket(server) // 함수 생성 - connection 폴더에 존재(웹소켓 관련 함수 존재)
}).catch(console.error)

