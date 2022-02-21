//should be stored in database, only for test purposes
const ROLE = {
    ADMIN: 'admin',
    USER: 'user'
}

module.exports = {
    ROLE: ROLE,
    refreshTokens: [],
    users: [],
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