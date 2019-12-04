// const Dao = require('./dao')
const Sequelize = require('sequelize');
const sequelize = require("./database")
const mapper = require('../models/page')(sequelize, Sequelize)
const Dao = require("./dao");

class PageDao extends Dao {
    constructor() {
        super()
    }


    get mapper() {
        return mapper;
    }


    /**
     * @return {Object} { id: 26, name: "name", isfile: true ... }
     * @param {Object} data { isfile: true, name: "aa", parent_id: 3 }
     */
    async createPage(data, transaction) {
        return await this.create(data, transaction)
    }


    /**
     * @return {Object}
     */
    async getPageTree(workspaceId) {
        var datas = await this.findAll({ parent_id: null, workspace_id: workspaceId })
        await this.getDataByParentId(datas)
        return datas
    }


    async getDataByParentId(array) {
        var instance = this
        await Promise.all(array.map(async (row) => {
            const children = await instance.findAll({ parent_id: row.id })
            if (children.length) {
                row.children = children
                await instance.getDataByParentId(row.children)
            }
        }))
    }
}

module.exports = PageDao