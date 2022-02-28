const {
    getMealPlans
} = require("../services/mealPlans.service");

exports.mealPlans_get_all = async (req, res, next) => {
    try {
        const mealPlans = await getMealPlans();
        res.status(200).json(mealPlans);
    } catch (error) {
        next(error);
    }
};