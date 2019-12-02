// Google Cloud Storage Bucket Name
const BUCKET_NAME = 'audio-demo';

require("dotenv").config();
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();
const myBucket = storage.bucket(BUCKET_NAME);
const speech = require("@google-cloud/speech").v1p1beta1;
const client = new speech.SpeechClient();
var fs = require("fs-extra");


class GCP {
  constructor() {
  }

  async getSignedURL(path) {
    const file = myBucket.file(path)
    const urls = await file.getSignedUrl({
      action: "read",
      expires: Date.now() + 3600000
    }).catch(err => {
      throw err;
    });
    return urls[0]
  }


  async convertSpeechToText(locationResult, speakerCount) {
    const audio = {
      uri: "gs://audio-demo/1/sample.flac"
    };
    const config = {
      sampleRateHertz: 48000,
      languageCode: "ja-JP",
      enableWordTimeOffsets: true,
    };
    if (speakerCount) {
      config.enableSpeakerDiarization = true
      config.diarizationSpeakerCount = speakerCount
      config.model = "default"
    }
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
        // response.results.forEach(result => {
        //   // transcription.push(result.alternatives[0].transcript)
        //   // console.log(`Transcription: ${result.alternatives[0].transcript}`);
        //   const res = this.formatSeparatedWordData(
        //     result.alternatives[0].words, locationResult
        //   );
        //   transcription = transcription.concat(res)
        // });

        var wordInfo = response.results[response.results.length - 1].alternatives[0].words
        const transcription = this._formatSeparatedWordData(
          wordInfo, locationResult
        );

        const json = JSON.stringify({
          transcription
        });
        // fs.writeFileSync("./speechMock3.json", json);
        return transcription;
      })
      .catch(err => {
        console.error("GCPとの通信でエラーが発生:", err);
      });
  }

  _formatSeparatedWordData(words, locationResult) {
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
      const speakerTag = wordInfo.speakerTag
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
        speaker_tag: speakerTag,
        starttime: startSecs,
        location_id: locationResult.id
      });
    });
    return transcription;
  }

}
module.exports = GCP;
