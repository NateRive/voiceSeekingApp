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
     * @param {Number} audioId 
     * @return {Array} [{id: ?? ...}, {}]
     */
    async getWordsByAudioId(audioId) {
        return await this.findAll({ where: { audio_id: audioId } })
    }
}

module.exports = WordDao