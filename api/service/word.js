const WordDao = require("../dao/word-dao");
const wordDao = new WordDao();
var fs = require("fs-extra");

class Word {
  constructor(fileid) {
    this.fileid = fileid
  }

  async makeSentence() {
    const res = await wordDao.getDatasByFileId(this.fileid)
    return res;
  }

}
module.exports = Word;
