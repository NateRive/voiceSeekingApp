// const Dao = require('./dao')
const Sequelize = require('sequelize');
const sequelize = require("./database")
const mapper = require('../models/workspace')(sequelize, Sequelize)
const Dao = require("./dao");

class WordDao extends Dao {
  constructor() {
    super()
  }

  get mapper() {
    return mapper;
  }



}

module.exports = WordDao