const PageResourceService = require("../services/pageResource.service");

exports.get_pageResource = async (req, res, next) => {
    try {
        const pageResource = await PageResourceService.getPageResource();
        res.status(200).json(pageResource);
    } catch (error) {
        next(error);
    }
};
