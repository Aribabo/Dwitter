let tweets =[ // 배열안에 객체 생성
    {
        id : '1',
        text:'안녕하세요',
        createdAt: Date.now().toString(),
        name:'김사과',
        username:'apple',
        url:'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    },
    {
        id : '2',
        text:'반갑습니다',
        createdAt: Date.now().toString(),
        name:'반하나',
        username:'banana',
        url:'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    }
];

export async function getAll(){return tweets} //데이터를 가져오는 함수 생성(가져오는 동안 에러나면 안되니까 비동기로 처리 )
export async function getAllByUsername(username){
    return tweets.filter((tweet)=> tweet.username === username)
}

export async function getByID(id){
    return tweets.find((tweet)=> tweet.id===id)
}

export async function create(text,name,username){
    const tweet = {
        id: '10',
        text, //자바는 키와 값의 이름이 같다면 생략가능 지금 text:text의 생략이 text
        createdAt : Date.now().toString(), 
        name, //키와 값 같아서 생략
        username //키와 값 같아서 생략
    }

    tweets = [tweet, ...tweets] // 수정될 것을 대비해서 트윗을 트윗스에 저장해줌 그러면 이제 서로 다른 메모리값을 가짐
    return tweets
}

export async function update(id,text){
    const tweet = tweets.find((tweet)=> tweet.id===id)
    if(tweet){
        tweet.text = text
    }
    return tweet
}

export async function remove(id){
    tweets = tweets.filter((tweet)=> tweet.id !== id) 
}