const PageDao = require("../dao/page-dao");
const GcpService = require("./gcp")
var gcpService = new GcpService()
require("dotenv").config();
const WordDao = require("../dao/word-dao");
const AwsObject = require("./aws/aws");
const awsObject = new AwsObject();
const MOCK = "mock"
var fs = require("fs-extra");
const sequelize = require("../dao/database");


class Speech {
  constructor(bucketName, fileName) {
  }

  async getAudioFromS3(pathTree, range) {
    return await awsObject.getDataFromS3(pathTree, range)
  }

  async converter() {
    const parent_id = 1;
    const name = "sample.flac";
    const isfile = true
    const pageDao = new PageDao();
    const wordDao = new WordDao();
    sequelize.transaction(async (transaction) => {
      const pageResult = await pageDao.createPage(
        {
          name,
          parent_id,
          isfile
        },
        transaction
      );
      const speakerCount = 1

      if (process.env.NODE_ENV == MOCK) {
        var audioResult = await this.googleSpeechAPIMock(pageResult);
      } else {
        var audioResult = await gcpService.convertSpeechToText(pageResult, speakerCount);
      }
      await wordDao.createBulkWords(audioResult, transaction)
      // this.notifyToPeople();
    })
  }

  async googleSpeechAPIMock(rawData, pageResult) {
    const test = JSON.parse(fs.readFileSync("./speechDataMock.json", "utf8"));
    return test.transcription
  }

  async notifyToPeople() {
    // AWSのSNSなどを使う
  }
}
module.exports = Speech;
