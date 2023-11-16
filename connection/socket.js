import { Server } from "socket.io";
import jwt from 'jsonwebtoken';
import { config } from "../config.js";
class Socket {
    constructor(server){
        this.io = new Server(server, {
            // react에서는 port번호가 다르기때문에 소켓안에 cors처리를 해줘야한다.
            cors: {
                origin: '*'
            }
        })
        this.io.use((socket,next) => {
            // auth 프로퍼티에 토큰을 담아줘야 외부에서 보이지 않음
            const token = socket.handshake.auth.token;
            if(!token){
                return next(new Error('인증 에러!'))
            }
            jwt.verify(token, config.jwt.secretKey, (error, decoded) =>{
                if(error){
                    return next(new Error('인증 에러!'))
                };
                next();
            })
        })
        this.io.on('connection', (socket) =>{
            console.log('클라이언트 접속!');
        })
    }
}
let socket;
export function initSocket(server){
    if(!socket){
        socket = new Socket()
    }
}
export function getSocketIo(){
    if(!socket) {
        throw new Error('먼저 init을 실행해야 함!')
    }
    return socket.io;
}