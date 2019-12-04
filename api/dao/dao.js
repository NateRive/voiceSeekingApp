// const Dao = require('./dao')
const Sequelize = require('sequelize');
const sequelize = require("./database")
const mapper = require('../models/word')(sequelize, Sequelize)

class Dao {
  constructor() {
  }



  async bulkCeate(iterable, transaction) {
    return await Promise.all(iterable.map(async item => {
      const res = await this.create(item, { transaction })
      return res;
    }))
  }

  async create(item, transaction) {
    const res = await this.mapper.create(item, transaction)
    return res.dataValues
  }

  async findAll(condition) {
    return await this.mapper.findAll({
      raw: true,
      where: condition
    })
  }
}

module.exports = Dao