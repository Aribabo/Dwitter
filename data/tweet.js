import * as userReporitory from './auth.js'

let tweets =[ // 배열안에 객체 생성
    {
        id : '1', // 글번호
        text:'안녕하세요',
        createdAt: Date.now().toString(),
        userId:'1'
    },
    {
        id : '2', 
        text:'반갑습니다',
        createdAt: Date.now().toString(),
        userId:'2'
    }
];
// Promise.all은 모든 Promise의 결과가 필요하고 순서가 중요하지 않을 때 유용
//await는 결과를 개별적으로 처리하며, 순서가 중요하고 이전 작업의 결과를 이용하여 다음 작업을 수행해야 할 때 유용

export async function getAll(){ // 모든 게시물별로 auth에 있는 유저정보를 추가해 모든 게시물을 반환
    return Promise.all( // Promise.all -> 비동기 작업을 병렬로 처리하고 모든 작업이 완료될때까지 기다림 
        tweets.map(async (tweet)=>{ // 배열을 순회하면서 각 요소에 대한 변환 또는 처리를 수행하는 배열 메서드
            const {username,name,url} = await userReporitory.findById(tweet.userId) // 게시물의 작성자아이디와 같은 유저의 정보를 가져옴
            return {...tweet, username, name, url} // 게시글과 유저정보를 합
        })
    )
} //데이터를 가져오는 함수 생성(가져오는 동안 에러나면 안되니까 비동기로 처리)


export async function getAllByUsername(username){ // 특정 유저의 게시글 전부 추출(근데이제url에 입력한애로)
    // getAll()되면 then으로 감, 안되면 catch로 감 여기서 catch는 생략
    return getAll().then((tweets) => tweets.filter((tweet)=> tweet.username === username)) //filter는 여러개반환가능,find는 하나만 반환
    // then을 써서 성공하면 실행할 코드를 작성
}

export async function getByID(id){ // 특정 게시물 검색
    const found = tweets.find((tweet)=> tweet.id === id) // 게시물리스트에서 게시물아이디로 검색
    if (!found){
        return null
    }
    const {username, name, url} = await userReporitory.findById(found.userId) //원하는 게시물 작성자의 정보 추출
    return {...found,username,name,url}
}

export async function create(text,userId){
    const tweet = {
        id: '10',
        text, //자바는 키와 값의 이름이 같다면 생략가능 지금 text:text의 생략이 text
        createdAt : Date.now().toString(), 
        userId
    }

    tweets = [tweet, ...tweets] // 수정될 것을 대비해서 트윗을 트윗스에 저장해줌 그러면 이제 서로 다른 메모리값을 가짐
    return getByID(tweet.id) // 게시물 아이디로 검색한 결과(게시물)리턴
}

export async function update(id,text){
    const tweet = tweets.find((tweet)=> tweet.id===id)
    if(tweet){
        tweet.text = text
    }
    return getByID(tweet.id) // 게시물 아이디로 검색한 결과(게시물)리턴
}

export async function remove(id){
    tweets = tweets.filter((tweet)=> tweet.id !== id) 
}