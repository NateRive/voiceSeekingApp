var AWS = require('aws-sdk')
const s3_bucket_name = require('../../util/const').S3_BUCKET_NAME
// AWS.config.update()
var s3 = new AWS.S3()
// if (process.env.NODE_ENV === 'development') {
//     AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'default' });
// }

class awsObject {
    constructor() {

    }

    async getDataFromS3(path) {
        var params = {
            Bucket: s3_bucket_name,
            Key: path
        }
        return new Promise((resolve, reject) => {
            s3.getObject(params, (err, data) => {
                if (err) {
                    console.log(err)
                    reject(err)
                } else {
                    resolve(data.Body)
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