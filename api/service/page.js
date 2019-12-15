const PageDao = require("../dao/page-dao");
const pageDao = new PageDao();
var fs = require("fs-extra");

class Speech {
    constructor(bucketName, fileName) {
    }

    async getPagesByParentId(parentId) {
        return await pageDao.getPagesByParentId(parentId)
    }

    async createPage(payload) {
        return await pageDao.create(payload)
    }

}
module.exports = Speech;
