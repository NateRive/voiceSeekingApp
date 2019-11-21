var AWS = require('aws-sdk')
// AWS.config.update()
var s3 = new AWS.S3()
// if (process.env.NODE_ENV === 'development') {
    // AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'private' });
// }

class awsObject {
    constructor() {

    }

    async getDataFromS3(bucket, file) {
        var params = {
            Bucket: bucket,
            Key: file
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