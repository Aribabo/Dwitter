import SQ from 'sequelize'
import { sequelize } from "../db/database.js"

// sequelize용 데이터타입 가져다 사용
const DataTypes =  SQ.DataTypes

// 테이블 생성
export const User = sequelize.define(
    'user', //테이블명(orm과 odm은 자동으로 이름뒤에 s 붙여짐 때문에 users로 생김)
    {
        id:{
            type:DataTypes.INTEGER,
            autoIncrement : true,
            allowNull : false,
            primaryKey : true
        },
        username:{
            type : DataTypes.STRING(45),
            allowNull:false
        },
        password:{
            type:DataTypes.STRING(128),
            allowNull:false
        },
        name : {
            type:DataTypes.STRING(128),
            allowNull: false
        },
        email:{
            type:DataTypes.STRING(128),
            allowNull:false
        },
        url : DataTypes.TEXT,     
    },
    {timestamps : false} // 레코드가 생성되거나 수정된 시간을 기록하지 않음
)

export async function createUser(user){
    return User.create(user).then((data)=>data.dataValues.id) // user객체를 알아서 들어가게끔, data.dataValues.id하면 insert된 id확인가능
}

export async function findByUsername(username){ // 무조건 []로 넣어줘야함
    return User.findOne({where:{username}}) // findOne은 데이터 한개(최초)만 출력
}

export async function findById(id){
    return User.findByPk(id) // PK에서 찾기
}