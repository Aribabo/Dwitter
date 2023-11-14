import { config } from '../config.js'
import SQ from 'sequelize'

// db접속관련 정보 가져오기
// sequelize 사용
const {host, user, database, password} = config.db
export const sequelize = new SQ.Sequelize(database,user,password,{
    host,
    dialect : 'mysql', //오라클 등 다양한 dbms사용가능
    logging : false
})

