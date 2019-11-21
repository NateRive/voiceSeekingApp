// const Dao = require('./dao')
const Sequelize = require('sequelize');
const sequelize =  require("./database")
const mapper = require('../models/word')(sequelize,  Sequelize)

class WordDao  {
    constructor() {
    }
    
    get mapper() {
        return mapper;
    }

    async bulkCeate(words) {
        sequelize.transaction(async (transaction) => {
            for (const word of words) {
                this.mapper.create(word, transaction)
            }
        })
    }
}

module.exports = WordDao