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
*/

router.get('/',isAuth, tweetController.getTweets) // getTweets()를 해주면 바로 실행되니까 ()안쓰고 써줌
//localhost:8080/Tweets/1
// GET / Tweets/:id

router.get('/:id',isAuth,tweetController.getTweet)


// POST / Tweets

router.post('/',isAuth,validationTweet,tweetController.createTweet)


// PUT / Tweets/:id -> find

router.put('/:id',isAuth,validationTweet,tweetController.updateTweet)

// DELETE / Tweets/:id -> filter

router.delete('/:id',isAuth,tweetController.deleteTweet)

export default router
