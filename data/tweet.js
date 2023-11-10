import { db } from "../db/database.js";

// 단! 트윗은 최근글이 제일 상단으로 올라오도록

const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw join users as us on tw.userid = us.id'

const ORDER_DESC = 'order by tw.createdAt desc'

export async function getAll(){ // 모든 게시물별로 auth에 있는 유저정보를 추가해 모든 게시물을 반환
    return db.execute(`${SELECT_JOIN} ${ORDER_DESC}`).then((result)=>result[0])

} //데이터를 가져오는 함수 생성(가져오는 동안 에러나면 안되니까 비동기로 처리)


export async function getAllByUsername(username){ // 특정 유저의 게시글 전부 추출(근데이제url에 입력한애로)
    return db.execute(`${SELECT_JOIN} where username = ? ${ORDER_DESC}`,[username]).then((result) => result[0])
}

export async function getByID(id){ // 특정 게시물 검색
    return db.execute(`${SELECT_JOIN} where tw.id = ? ${ORDER_DESC}`,[id]).then((result) => result[0][0])
}

export async function create(text,userId){ // 입력후엔 아이디번호를 알아내 해당 아이디의 모든글 뽑아내기
    return db.execute('insert into tweets (text,createdAt,userId) values (?,?,?)',[text,new Date(),userId]).then((result) => getByID(result[0].insertId))
    // tweets = [tweet, ...tweets] // 수정될 것을 대비해서 트윗을 트윗스에 저장해줌 그러면 이제 서로 다른 메모리값을 가짐
    // return getByID(tweet.id) // 게시물 아이디로 검색한 결과(게시물)리턴
}

export async function update(id,text){
    return db.execute('update tweets set text = ? where id = ?',[text,id]).then(()=> getByID(id))
}

export async function remove(id){
    return db.execute('delete from tweets where id = ?',[id])
}