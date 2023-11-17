import Mongoose from "mongoose";
import { useVirtualId } from "../db/database.js";
const userSchema = new Mongoose.Schema({
    username: {type: String, require: true},
    name: {type:String, require: true},
    email: {type:String, require: true},
    password: {type:String, require: true},
    url: String
})
useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema) // model : 컬렉션 생성. 이름은 자동으로 s가 붙고 어떤 형식으로 만들지 옵션을 써줌
export async function findByUsername(username) {
    return User.findOne({username});
}
export async function findById(id){
    return User.findById(id); // 얘는 user안에 있는 findById라는 몽고디비 함수
}
export async function createUser(user) {
    return new User(user).save().then((data) => data.id); // 메모리에 올라갔던 virtualid
}