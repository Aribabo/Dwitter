import * as tweetRepository from '../data/tweet.js'

// 데이터를 여기에서 로직처리



export async function getTweets(req,res,next){
    const username = req.query.username 
    const data = await(username
        ?tweetRepository.getAllByUsername(username) // username 있으면 해당 유저의 글만 추출
        :tweetRepository.getAll()) // username없으면 전체게시물 추출
    res.status(200).json(data)
}

//gettweet
export async function getTweet(req,res,next){
    const id = req.params.id
    const tweet = await tweetRepository.getByID(id) //getByID는 특정게시물 아이디를 가진애 추출
    if (tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message:`Tweet id(${id}) not found`})
    }
}


//createtweet
export async function createTweet(req,res,next){
    const {text} = req.body
    const tweets = await tweetRepository.create(text,req.userId) // 만들 텍스트와 로그인한 유저(토큰)의 아이디 전달해서 무조건 자신의 게시물을 쓰게끔
    res.status(201).json(tweets)
}


//updatetweet
export async function updateTweet(req,res,next){
    const text = req.body.text 
    const id = req.params.id 
    const tweet = await tweetRepository.getByID(id) //바꾸고싶은 게시글아이디로 검색해서 게시글 불러옴
    if(!tweet){
        res.status(404).json({message:`Tweet id(${id}) not found`})
    }
    if(tweet.userId !== req.userId){ // 로그인한 유저(req.userid)와 게시물작성자아이디 일치하는지 확인
        return res.status(404).json({message:`Tweet 수정 권한 없음`}) //일치안할시
    }
    
    const updated = await tweetRepository.update(id,text) //일치할시
    res.status(201).json(updated)
}


//deletetweet
export async function deleteTweet(req,res,next){
    const id = req.params.id 
    const tweet = await tweetRepository.getByID(id) //삭제하고 싶은 게시물을 가지고옴

    if(!tweet){
        return res.status(404).json({message:`Tweet id(${id}) not found`}) //게시물 없을때
    }
    if(tweet.userId !== req.userId){ //로그인한 유저와 게시글작성자 같은지 확인
        return res.sendStatus(403)
    }
    
    await tweetRepository.remove(id) // 다 조건에 맞을경우 삭제!
    res.sendStatus(204)
}

