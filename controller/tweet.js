import * as tweetRepository from '../data/tweet.js'
import { getSocketIo } from '../connection/socket.js';
export async function getTweets(req, res) {
    const username = req.query.username;
    const data = await (username
        ? tweetRepository.getAllByUsername(username)
        : tweetRepository.getAll());
    res.status(200).json(data);
}
export async function getTweet(req, res, next) {
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id)
    if (tweet) {
        res.status(200).json(tweet);
    }else{
        res.status(404).json({message: `Tweet id(${id}) not found`});
    }
}
export async function createTweet(req, res, next) {
    const {text} = req.body;
    const tweet = await tweetRepository.create(text, req.userId);
    res.status(201).json(tweet);
    getSocketIo().emit('tweets', tweet);
}
export async function updateTweet(req, res, next) {
    const id = req.params.id
    const text = req.body.text;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
    if(tweet.userId !== req.userId){
        return res.status(403).json({message: `권한 없음!`})
    }
    const updated = await tweetRepository.update(id, text)
    res.status(200).json(updated);
};
export async function deleteTweet(req, res, next){
    const id = req.params.id;
    const tweet = await tweetRepository.getById(id);
    if (!tweet) {
        res.status(404).json({message: `Tweet id(${id}) not found`})
    }
    if(tweet.userId !== req.userId){
        return res.sendStatus(403)
    }
    await tweetRepository.remove(id)
    return res.sendStatus(204)
}
// 204번으로 하면 메세지 전달 불가.