var AWS = require('aws-sdk')
var fs = require("fs-extra");

const s3_bucket_name = require('../../util/const').S3_BUCKET_NAME
// AWS.config.update()
var s3 = new AWS.S3()
// if (process.env.NODE_ENV === 'development') {
//     AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
// }

class awsObject {
    constructor() {

    }

    async getDataFromS3(path, range) {
        const number = range.match(/\d+/)[0]
        const endtime = Number(number) + 1000000
        range = range + endtime
        var params = {
            Bucket: s3_bucket_name,
            Key: path,
            Range: range
        }
        return new Promise((resolve, reject) => {
            console.time("aaa")
            s3.getObject(params, (err, data) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    console.timeEnd("aaa")
                    resolve(data)
                }
            })
        })
    }


    recordAudioLocation(bucket, file) {

    }

    writeData() {

    }

    delete() {

    }
}

module.exports = awsObject