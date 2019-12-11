// const Dao = require('./dao')
const Sequelize = require('sequelize');
const sequelize = require("./database")
const mapper = require('../models/group')
const PageMapper = require("../models/page")
const Dao = require("./dao");

class GroupDao extends Dao {
    constructor() {
        super()
    }


    get mapper() {
        return mapper;
    }


    async getGroupsWithTopPages(workspaceId) {
        const res = await this.findAll({
            where: { workspace_id: workspaceId, '$page.parent_id$': null },
            include: [{
                model: PageMapper,
                as: "page",
            }]
        })
        return res
    }

}

module.exports = GroupDao