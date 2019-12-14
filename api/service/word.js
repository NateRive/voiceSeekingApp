const WordDao = require("../dao/word-dao");
const wordDao = new WordDao();
var fs = require("fs-extra");

class Word {
  constructor() {
  }

  async getWordsByAudioId(audioId) {
    const res = await wordDao.getWordsByAudioId(audioId)
    return res;
  }

}
module.exports = Word;
