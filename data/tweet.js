// import {db} from '../db/database.js';
import MongoDb from 'mongodb';
import { getTweets, getUsers } from '../db/database.js';
import * as UserRepository from './auth.js';
import { Result } from 'express-validator';
const ObjectID = MongoDb.ObjectId;
const SELECT_JOIN = 'SELECT tw.id, tw.text, tw.createdAt, tw.userId, us.username, us.name, us.email, us.url from tweets as tw JOIN users as us ON tw.userId = us.id';
const ORDER_DESC = 'ORDER BY tw.createdAt DESC'
export async function getAll() {
    return getTweets()
        .find()
        .sort({ createdAt: -1 })
        .toArray()
        .then(mapTweets);
}
export async function getAllByUsername(username){
    return getTweets()
        .find({username})
        .sort({ createdAt: -1 })
        .toArray()
        .then(mapTweets);
}
export async function getById(id){
    return getTweets()
        .find({_id: new ObjectID(id)})
        .next()
        .then(mapOptionalTweet);
}
export async function create(text, userId){
    return UserRepository.findById(userId)
        .then((user) =>
            getTweets().insertOne({
                text,
                createdAt: new Date(),
                userId,
                username: user.username,
                url: user.url
            })
            )
            .then((result) => getById(result.insertedId))
            .then(mapOptionalTweet);
}
export async function update(id, text) {
    return getTweets().findOneAndUpdate(
        {_id : new ObjectID(id)}, //찾을 조건
        {$set : {text}}, // 바꿀값 설정
        {returnDocument  : 'after'} // 변경된 후 결과값 출력
    )
    .then((result)=>result)
    .then(mapOptionalTweet)
    }
    

export async function remove(id) {
    return getTweets().deleteOne({_id:new ObjectID(id)})
}
function mapTweets(tweets) {
    return tweets.map(mapOptionalTweet)
}
function mapOptionalTweet(tweet){
    return tweet ? {...tweet, id: tweet.insertedId}:
    tweet;
}