import * as tweetRepository from '../data/tweet.js'
// 데이터를 여기에서 로직처리

export async function getTweets(req,res,next){
    const username = req.query.username
    const data = await(username
        ?tweetRepository.getAllByUsername(username)
        :tweetRepository.getAll())
    res.status(200).json(data)
}

//gettweet
export async function getTweet(req,res,next){
    const id = req.params.id
    const tweet = await tweetRepository.getByID(id)
    if (tweet){
        res.status(200).json(tweet)
    }else{
        res.status(404).json({message:`Tweet id(${id}) not found`})
    }
}


//createtweet
export async function createTweet(req,res,next){
    const {text,name,username} = req.body
    const tweets = await tweetRepository.create(text,name,username)
    res.status(201).json(tweets)
}


//updatetweet
export async function updateTweet(req,res,next){
    const id = req.params.id 
    const text = req.body.text
    const tweet = await tweetRepository.update(id,text)
    if(tweet){
        res.status(201).json(tweet)
    }else{
        res.status(404).json({message:`Tweet id(${id}) not found`})
    }
}


//deletetweet
export async function deleteTweet(req,res,next){
    const id = req.params.id
    await tweetRepository.remove(id)
    res.sendStatus(204).json({message:`Tweet id(${id}) not found`}) // sendStatus는 완료되면 끝나는거라 json지원 x, 204는 메세지호환이 안됨 번호마다 애가 허용되는 애도 있고 안되는 애도 있음
}
