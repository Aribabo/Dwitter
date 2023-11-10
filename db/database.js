import mysql from 'mysql2'
import { config } from '../config.js'

const pool = mysql.createPool({ // 유저 한명이 접속 할때마다 사용자가 db와 연결할 수 있는 객체 생성
    host : config.db.host,
    user : config.db.user,
    database : config.db.database,
    password : config.db.password
}) 

export const db = pool.promise() // promise 형태로 바꿔서 리턴 -> then 사용가능