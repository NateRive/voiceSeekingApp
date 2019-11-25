const LocationDao = require("../dao/location-dao");
const speech = require("@google-cloud/speech");
require("dotenv").config();
const client = new speech.SpeechClient();
const WordDao = require("../dao/word-dao");
const AwsObject = require("./aws/aws");
const awsObject = new AwsObject();
const MOCK = "mock"
var fs = require("fs-extra");

class Speech {
  constructor(bucketName, fileName) {
  }

  async getAudioFromS3(pathTree) {
    return await awsObject.getDataFromS3(pathTree)
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
    //   "1/outsidersample1.flac"
    // );
    const rawData = ""
    console.log(rawData.toString);
    if (process.env.NODE_ENV == MOCK) {
      var audioResult = await this.googleSpeechAPIMock(rawData, locationResult);
    } else {
      var audioResult = await this.googleSpeechAPI(rawData, locationResult);
    }
    await wordDao.bulkCeate(audioResult)
    // this.notifyToPeople();
  }

  async googleSpeechAPIMock(rawData, locationResult) {
    const test = JSON.parse(fs.readFileSync("./speechDataMock.json", "utf8"));
    return test.transcription
  }

  async googleSpeechAPI(audioData, locationResult) {
    const audio = {
      // content: audioData
      uri: "gs://audio-demo/outsidersample1.flac"
    };
    const config = {
      sampleRateHertz: 48000,
      languageCode: "ja-JP",
      enableWordTimeOffsets: true
    };
    const request = {
      audio: audio,
      config: config
    };
    // // Detects speech in the audio file
    console.log("今からGCPとの通信が始まります");
    return client
      .longRunningRecognize(request)
      .then(data => {
        const operation = data[0];
        // Get a Promise representation of the final result of the job
        return operation.promise();
      })
      .then(data => {
        const response = data[0];
        console.log(response.results);
        var transcription = []
        response.results.forEach(result => {
          // transcription.push(result.alternatives[0].transcript)
          // console.log(`Transcription: ${result.alternatives[0].transcript}`);
          const res = this.formatSeparatedWordData(
            result.alternatives[0].words, locationResult
          );
          transcription = transcription.concat(res)
        });

        const json = JSON.stringify({
          transcription
        });
        fs.writeFileSync("./speechDataMock.json", json);
        return transcription;
      })
      .catch(err => {
        console.error("GCPとの通信でエラーが発生:", err);
      });
  }

  async notifyToPeople() {
    // AWSのSNSなどを使う
  }

  formatSeparatedWordData(words, locationResult) {
    let transcription = [];
    words.forEach(wordInfo => {
      // NOTE: If you have a time offset exceeding 2^32 seconds, use the
      // wordInfo.{x}Time.seconds.high to calculate seconds.
      const startSecs =
        `${wordInfo.startTime.seconds}` +
        `.` +
        wordInfo.startTime.nanos / 100000000;
      const endSecs =
        `${wordInfo.endTime.seconds}` +
        `.` +
        wordInfo.endTime.nanos / 100000000;
      console.log(`Word: ${wordInfo.word}`);
      console.log(`\t ${startSecs} secs - ${endSecs} secs`);
      if (wordInfo.word.indexOf("|") > -1) {
        const wordIndex = wordInfo.word.indexOf("|");
        var formattdWord = wordInfo.word.slice(0, wordIndex);
      } else {
        var formattdWord = wordInfo.word;
      }
      transcription.push({
        word: formattdWord,
        starttime: startSecs,
        location_id: locationResult.id
      });
    });
    return transcription;
  }
}
module.exports = Speech;
