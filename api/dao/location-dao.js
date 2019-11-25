// const Dao = require('./dao')
const Sequelize = require('sequelize');
const sequelize = require("./database")
const mapper = require('../models/location')(sequelize, Sequelize)

class LocationDao {
    constructor() {
    }

    get mapper() {
        return mapper;
    }

    /**
     * @return {Object} { id: 26, name: "name", isfile: true ... }
     * @param {String} bucketName 
     * @param {String} fileName 
     */
    async createLocation(name, parent_id, isfile) {
        return await this.mapper.create({ name: name, parent_id: parent_id, isfile: isfile })
            .then((data) => {
                return data.dataValues;
            })
            .catch((err) => {
                console.log(err)
            })
    }

    async getLocationTree() {
        try {
            var datas = await this.mapper.findAll({
                raw: true,
                where: {
                    parent_id: null
                }
            })
            await this.getDataByParentId(datas)
            return datas
        } catch (err) {
            console.log(err)
        }
    }

    async getDataByParentId(array) {
        var instance = this
        await Promise.all(array.map(async (row) => {
            const children = await instance.mapper.findAll({
                raw: true,
                where: {
                    parent_id: row.id
                }
            })
            if (children.length) {
                row.children = children
                await instance.getDataByParentId(row.children)
            }
        }))
    }
}

module.exports = LocationDao