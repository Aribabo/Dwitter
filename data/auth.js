let users = [
    {
        id : '1',
        username:'apple',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name:'김사과',
        email:'apple@apple.com',
        url : 'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'

    },
    {        
        id : '2',
        text:'반갑습니다',
        password: '$2b$10$6NVVL4gEtPh684Ncn2sCRe/LPe0u4kRkhBYSoiLx4bTGW5gwQ58Dy',
        name:'반하나',
        username:'banana@banana.com',
        url:'https://i.pinimg.com/originals/a8/dc/63/a8dc63c8abeeb6708dbec6ef3009608a.jpg'
    }
]

export async function createUser(user){
    const created = {...user, id:'10'}
    users.push(created) // users에 created 추가
    return created.id
}

export async function findByUsername(username){
    return users.find((user)=> user.username===username) 
}

export async function findById(id){
    return users.find((user)=> user.id===id) 
}