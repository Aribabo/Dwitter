import express from "express";
import * as tweetController from '../controller/tweet.js';
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import { isAuth } from '../middleware/auth.js'
const router = express.Router();
// POST,PUT에 text에 대해 빈 문자열을 없애고, 최소 3자 이상 입력해야 저장되도록 API 적용
const validateTweet = [
    body('text').trim().isLength({min: 3}).withMessage('최소 3자 이상 입력!'),validate
]
// GET / Tweets
// GET / Tweets?username=:username
router.get('/', isAuth, tweetController.getTweets)
// GET / Tweets/:id
router.get('/:id',isAuth, tweetController.getTweet)
// POST / Tweets
router.post('/',isAuth, validateTweet, tweetController.createTweet)
// PUT / Tweets/:id
router.put('/:id',isAuth, validateTweet, tweetController.updateTweet)
// DELETE / Tweets/:id
router.delete('/:id', isAuth, tweetController.deleteTweet)
export default router;