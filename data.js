//should be stored in database, only for test purposes
const ROLE = {
    ADMIN: 'admin',
    USER: 'user'
}

module.exports = {
    ROLE: ROLE,
    refreshTokens: [],
    users: [
        {id:1, name: 'tom', role: ROLE.USER},
        {id:2, name: 'bill', role: ROLE.ADMIN},
        {id:3, name: 'jim', role: ROLE.USER}
    ],
    recipes: [
        {
            username: 'tom',
            title: 'recipe 1',
        },
        {
            username: 'jim',
            title: 'recipe 2'
        }
    ]
}