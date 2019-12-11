const mapper = require('../models/workspace')
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