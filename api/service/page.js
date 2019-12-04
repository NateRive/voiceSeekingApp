const PageDao = require("../dao/page-dao");
const pageDao = new PageDao();
var fs = require("fs-extra");

class Speech {
    constructor(bucketName, fileName) {
    }

    async getPages(workspaceId) {
        return await pageDao.getPageTree(workspaceId)
    }

}
module.exports = Speech;
