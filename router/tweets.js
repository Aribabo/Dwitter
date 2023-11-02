import express from "express";
import * as tweetController from '../controler/tweet.js'
const router = express.Router();

// GET / Tweets
// GET / Tweets?username=:username
// 이건 그냥 썼을때
// router.get('/',(req,res,next) => {
//     const username = req.query.username
//     const data = username //3항연산자 사용 => 변수=조건식?참:거짓
//         ? tweets.filter((tweet)=> tweet.username === username) //타입까지 비교하려고 === 사용, username이 있을때 실행
//         : tweets; //username이 없을때          
//     res.status(200).json(data)
// })
// 이건 작업별로 분리했을때
router.get('/',tweetController.getTweets) // getTweets()를 해주면 바로 실행되니까 ()안쓰고 써줌

// GET / Tweets/:id
// 이건 그냥 썼을때
// router.get('/:id',(req,res,next) => {
//     const id = req.params.id
//     const tweet = tweets.find((tweet)=> tweet.id===id) //조건에 맞는 객체 찾아서 tweet에 저장     
//     if (tweet){
//         res.status(200).json(tweet)
//     }else{
//         res.status(404).json({message:`Tweet id(${id}) not found`})
//     }
// })
//이건 작업별로 썼을때 
router.get('/:id',tweetController.getTweet)

// POST / Tweets
// router.post('/',(req,res,next) => {
//     const {text,name,username} = req.body
//     const tweet = {
//         id: '10',
//         text, //자바는 키와 값의 이름이 같다면 생략가능 지금 text:text의 생략이 text
//         createdAt : Date.now().toString(), 
//         name, //키와 값 같아서 생략
//         username //키와 값 같아서 생략
//     }

//     tweets = [tweet, ...tweets] // 수정될 것을 대비해서 트윗을 트윗스에 저장해줌 그러면 이제 서로 다른 메모리값을 가짐
//     res.status(201).json(tweets)
// })

router.post('/',tweetController.createTweet)


// PUT / Tweets/:id -> find
// router.put('/:id',(req,res,next) =>{
//     const id = req.params.id 
//     const text = req.body.text
//     const tweet = tweets.find((tweet)=> tweet.id===id)
//     if(tweet){
//         tweet.text = text
//         res.status(201).json(tweet)
//     }else{
//         res.status(404).json({message:`Tweet id(${id}) not found`})
//     }
// })
//작업별로
router.get('put/:id',tweetController.updateTweet)

// DELETE / Tweets/:id -> filter
// router.delete('/:id',(req,res,next) =>{
//     const id = req.params.id
//     tweets = tweets.filter((tweet)=> tweet.id !== id)   
//     res.sendStatus(204).json({message:`Tweet id(${id}) is deleted`})
// });
router.delete('/:id',tweetController.deleteTweet)

export default router
