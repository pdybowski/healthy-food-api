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
            userId: 1,
            title: 'recipe 1',
            recipeId: 1,
        },
        {
            username: 'jim',
            userId: 2,
            title: 'recipe 2',
            recipeId: 2
        }
    ]
}