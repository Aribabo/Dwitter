import express from "express";
import {body} from 'express-validator'
import * as tweetController from '../controller/tweet.js'
import {validate} from '../middleware/validator.js'
import {isAuth} from '../middleware/auth.js'

const router = express.Router();
/* POST,PUT에 text에 대해 빈문자열을 없애도 최소 3자이상 입력해야 저장되도록 API에 적용 */
const validationTweet = [
    body('text').trim().isLength({min:3}).withMessage('최소 3자 이상 입력해주세요'),validate
]

/*
GET / Tweets
GET / Tweets?username=:username
이건 그냥 썼을때
localhost:8080/Tweets/
router.get('/',(req,res,next) => {
    const username = req.query.username
    const data = username //3항연산자 사용 => 변수=조건식?참:거짓
        ? tweets.filter((tweet)=> tweet.username === username) //타입까지 비교하려고 === 사용, username이 있을때 실행
        : tweets; //username이 없을때          
    res.status(200).json(data)
})
*/

// 이건 작업별로 분리했을때
router.get('/',isAuth, tweetController.getTweets) // getTweets()를 해주면 바로 실행되니까 ()안쓰고 써줌
//localhost:8080/Tweets/1
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
router.get('/:id',isAuth,tweetController.getTweet)


// POST / Tweets

router.post('/',isAuth,validationTweet,tweetController.createTweet)


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
router.put('/:id',isAuth,validationTweet,tweetController.updateTweet)

// DELETE / Tweets/:id -> filter
// router.delete('/:id',(req,res,next) =>{
//     const id = req.params.id
//     tweets = tweets.filter((tweet)=> tweet.id !== id)   
//     res.sendStatus(204).json({message:`Tweet id(${id}) is deleted`})
// });
router.delete('/:id',isAuth,tweetController.deleteTweet)

export default router
