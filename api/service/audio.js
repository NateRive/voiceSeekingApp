const AudioDao = require("../dao/audio-dao");
const audioDao = new AudioDao();
var fs = require("fs-extra");

class AudioService {
    constructor(bucketName, fileName) {
    }

    async getAudiosByPageId(parentId) {
        return await audioDao.getAudiosByPageId(parentId)
    }

}
module.exports = AudioService;
