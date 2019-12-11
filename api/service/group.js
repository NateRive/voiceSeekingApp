const GroupDao = require("../dao/group-dao");
const groupDao = new GroupDao();
var fs = require("fs-extra");

class GroupService {
    constructor(bucketName, fileName) {
    }

    /**
     * 
     * @return {Array} res
       [{
           id: 1, name: "aa", pages: [{id: 2}]
       }]
     */
    async getGroups(workspaceId) {
        const res = await groupDao.getGroupsWithTopPages(workspaceId)
        return res;
    }

}
module.exports = GroupService;
