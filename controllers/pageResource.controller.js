const getPageResource = require("../services/pageResource.service");

exports.get_pageResource = async (req, res, next) => {
    try {
        const pageResource = await getPageResource();
        res.status(200).json(pageResource);
    } catch (error) {
        next(error);
    }
};
