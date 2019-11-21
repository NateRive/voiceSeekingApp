// const Dao = require('./dao')
const Sequelize = require('sequelize');
const sequelize =  require("./database")
const mapper = require('../models/location')(sequelize,  Sequelize)

class LocationDao  {
    constructor() {
    }
    
    get mapper() {
        return mapper;
    }

    /**
     * @return {Object} { id: 26, folder: "forder1", file: "record1" ... }
     * @param {String} bucketName 
     * @param {String} fileName 
     */
    async createLocation(bucketName, fileName) {
        console.log(bucketName, fileName)
        return await this.mapper.create({ folder: bucketName, file: fileName })
            .then((data) => {
                return data.dataValues;
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

module.exports = LocationDao