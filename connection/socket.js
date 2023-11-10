import { Server } from "socket.io"
import jwt from  'jsonwebtoken'
import { config } from "../config.js"

//cdn은 외부컴퓨터에 라이브러리가 올라가 있고 그걸 가져다가 쓰는 방식
class Socket {
    constructor(server){
        this.io = new Server(server,{ // socket.io 패키지의 SErver 사용해 서버객체생성
            cors:{
                origin : '*' // origin은 출처, 어떤 출처에서도 사용할 수 있게 설정해서 코스에러 뜨지 않도록
            }
        })
        // 소켓도 해킹 가능함으로 토큰처리 필요
        this.io.use((socket,next) => {
            const token = socket.handshake.auth.token //양방향통신설정, socket.handshake하면 token이 생김 그걸 가져올때 auth로 데이터 안보이게 설정, query로 할 경우 그 안의 데이터가 보임
            if(!token){
                return next(new Error('인증 에러'))
            }
            // jwt 맞는지 확인
            jwt.verify(token,config.jwt.secretKey,(error,decoded) =>{
                if(error){
                    return next(new Error('인증 에러!'))
                }
                next()
            })
        })
        this.io.on('connection',(socket)=> {
            console.log('클라이언트 접속');
        })
    }
}
let socket
export function initSocket(server){
    if(!socket){ // 이전에 소켓이 있으면 즉, 살짝 끊어졌다가 붙으면 새로운 소켓 생성안하고 원래 소켓 사용하게함(메모리 절약)
        socket = new Socket()
    }
}

export function getSocketIO(){
    if(!socket){
        throw new Error('먼저 init를 실행해야 함')
    }
    return socket.io // 이게 뭔데? 
}



