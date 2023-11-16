import {getUsers} from '../db/database.js';
import MongoDB from 'mongodb';
const ObjectID = MongoDB.ObjectId; // unique로 항상 붙던 Id 변수를 하나 만듬
export async function findByUsername(username){
    return getUsers().find({username}).next().then(mapOptionalUser)
}
export async function findById(id){
    return getUsers().find({_id: new ObjectID(id)}).next().then(mapOptionalUser) // 몽고디비에서 사용하는 ObjectID형식으로 id를 변환해서 찾은 후 id값으로 넣어줌
}
export async function createUser(user) {
    return getUsers().insertOne(user).then((result) => console.log(result.insertedId.toString()));
}
function mapOptionalUser(user) {
    return user ? {...user, id: user._id.toString()} : user;
}