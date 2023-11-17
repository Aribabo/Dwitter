import Mongoose from 'mongoose'
import { config } from '../config.js'

export async function connectDB(){
    return Mongoose.connect(config.db.host)
}

export function useVirtualId(schema){
    // useVirtualId는 스키마를 넣으면 실제로 스키마에 저장되는 내용은 아닌데 메모리에 올라간 id라는 항목이 생긴걸 string으로 해서 버츄얼(실제로 데이터에 저장하는건 아니지만 메모리에 살아있는 데이터)로 json과 object 형태로 존재하게
    schema.virtual('id').get(function () { //아이디값을 받아서 function적용
        return this._id.toString()
    })
    schema.set('toJSN',{virtuals:true})
    schema.set('toObject',{virtuals:true})
}

let db
export function getTweets(){
    return db.collection('tweets')
}