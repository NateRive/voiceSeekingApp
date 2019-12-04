const WorkspaceDao = require("../dao/Workspace-dao");
const workspaceDao = new WorkspaceDao();
var fs = require("fs-extra");

class Workspace {
  constructor() {
  }

  async getWorkspaceList() {
    const res = await workspaceDao.findAll({})
    return res;
  }

}
module.exports = Workspace;
