import SQ from 'sequelize'
import { sequelize } from "../db/database.js";
import {User} from './auth.js';

// sequelize용 데이터타입 가져다 사용
const DataTypes =  SQ.DataTypes
const Sequelize =  SQ.Sequelize


// 
const Tweet = sequelize.define('tweet',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    text:{
        type : DataTypes.TEXT,
        allowNull:false
    }
    // createdAt은 안만들어도 자동생성
})
Tweet.belongsTo(User) // 자동으로 pk기반으로 fk생성(userId)

const INCLUDE_USER = {
    attributes : [
        'id','text','createdAt','userId',
        [Sequelize.col('user.name'),'name'], // user의 name을 가져오겠다 Sequelize.col을 안하면 하위객체로 가져와짐
        [Sequelize.col('user.username'),'username'], // user의 username 가져오겠다
        [Sequelize.col('user.url'),'url'] // user의 url 가져오겠다
    ],
    include:{
        model:User, // model은 가져오고싶은 테이블
        attributes:[], //attributes는 가져오고자 하는 내용
    }
}

const ORDER_DESC = {
    order:[['createdAt','DESC']] //배열로 감싼채로 입력
}

export async function getAll(){ // 모든 게시물별로 auth에 있는 유저정보를 추가해 모든 게시물을 반환
    return Tweet.findAll({...INCLUDE_USER,...ORDER_DESC}) //INCLUDE_USER나 ORDER_DESC가 달라지면 같이 달라지게 ...사용

} //데이터를 가져오는 함수 생성(가져오는 동안 에러나면 안되니까 비동기로 처리)


export async function getAllByUsername(username){ // 특정 유저의 게시글 전부 추출(근데이제url에 입력한애로)
    return Tweet.findAll({...INCLUDE_USER,...ORDER_DESC,
        include:{ // INCLUDE_USER.include는  INCLUDE_USER.include과 Tweet을 조인해주는 거임
            ...INCLUDE_USER.include,where:{username} // INCLUDE_USER의 include인 User테이블을 활용하여 조인, where로 조인조건적용
        }})
}


export async function getById(id){
    return Tweet.findOne({ where: {id}, ...INCLUDE_USER})
}
export async function create(text, userId){
    return Tweet.create({text, userId})
        .then((data) => this.getById(data.dataValues.id))
}

export async function update(id,text){
    return Tweet.findByPk(id,INCLUDE_USER).then((tweet)=>{
        tweet.text = text
        return tweet.save()
    })
}

export async function remove(id){
    return Tweet.findByPk(id).then((tweet)=>{
        tweet.destroy()
    })
}