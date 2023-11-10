import { db } from "../db/database.js"

// db연결

export async function createUser(user){
    const {username, password, name, email, url} = user
    return db.execute('insert into users (username, password, name, email, url) values(?,?,?,?,?)',[username, password, name, email, url])
    .then((result)=>result[0].insertId)
}

export async function findByUsername(username){ // 무조건 []로 넣어줘야함
    return db.execute('select * from users where username = ?',[username]).then((result)=>result[0][0])
}

export async function findById(id){
    return db.execute('select * from users where id = ?',[id]).then((result)=>result[0][0])
}