// const Dao = require('./dao')
const mapper = require('../models/audio')
const Dao = require("./dao");

class AudioDao extends Dao {
    constructor() {
        super()
    }


    get mapper() {
        return mapper;
    }

    async getAudiosByPageId(pageId) {
        return await this.findAll({
            where: { page_id: pageId }
        })
    }
}

module.exports = AudioDao