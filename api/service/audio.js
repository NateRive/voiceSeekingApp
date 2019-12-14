const AudioDao = require("../dao/audio-dao");
const audioDao = new AudioDao();
var fs = require("fs-extra");

class AudioService {
    constructor(bucketName, fileName) {
    }

    async getAudiosByPageId(parentId) {
        const res = await audioDao.getAudiosByPageId(parentId)
        return res;
    }


}
module.exports = AudioService;
