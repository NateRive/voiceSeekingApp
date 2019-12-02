const LocationDao = require("../dao/location-dao");
const GcpService = require("./gcp")
var gcpService = new GcpService()
require("dotenv").config();
const WordDao = require("../dao/word-dao");
const AwsObject = require("./aws/aws");
const awsObject = new AwsObject();
const MOCK = "mock"
var fs = require("fs-extra");

class Speech {
  constructor(bucketName, fileName) {
  }

  async getAudioFromS3(pathTree, range) {
    return await awsObject.getDataFromS3(pathTree, range)
  }

  async converter() {
    const parent_id = 1;
    const name = "outsidersample1.flac";
    const isfile = true
    const locationDao = new LocationDao();
    const wordDao = new WordDao();
    const locationResult = await locationDao.createLocation(
      name,
      parent_id,
      isfile
    );
    // const rawData = await awsObject.getDataFromS3(
    //   "1/sample.flac"
    // )
    const speakerCount = 1

    // console.log(rawData.toString);
    if (process.env.NODE_ENV == MOCK) {
      var audioResult = await this.googleSpeechAPIMock(rawData, locationResult);
    } else {
      var audioResult = await gcpService.convertSpeechToText(locationResult, speakerCount);
    }
    await wordDao.bulkCeate(audioResult)
    // this.notifyToPeople();
  }

  async googleSpeechAPIMock(rawData, locationResult) {
    const test = JSON.parse(fs.readFileSync("./speechDataMock.json", "utf8"));
    return test.transcription
  }

  async notifyToPeople() {
    // AWSのSNSなどを使う
  }
}
module.exports = Speech;
