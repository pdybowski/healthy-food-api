//should be stored in database
const recipes = [
    {
        username: 'tom',
        title: 'recipe 1',
    },
    {
        username: 'jim',
        title: 'recipe 2'
    }
]

exports.findAllRecipes = async () => {
    return recipes;
}

exports.findUserRecipes = async (user) => {
    return recipes.filter(recipe => recipe.username === user.name);
}
