const mapper = require('../models/word')
const Dao = require("./dao");

class WordDao extends Dao {
    constructor() {
        super()
    }

    get mapper() {
        return mapper;
    }

    async createBulkWords(words, transaction) {
        // sequelize.transaction(async (transaction) => {
        await this.bulkCeate(words, transaction)
        // })
    }

    /**
     * @param {Number} fileId 
     * @return {Array} [{id: ?? ...}, {}]
     */
    async getDatasByFileId(pageId) {
        return await this.findAll({ page_id: pageId })
    }
}

module.exports = WordDao