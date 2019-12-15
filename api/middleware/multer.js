const multer = require('multer');
const MulterGoogleCloudStorage = require("multer-google-storage")
// import MulterGoogleCloudStorage from 'multer-google-storage';
const consts = require("../util/const");

const uploadHandler = multer({
    storage: MulterGoogleCloudStorage.storageEngine({
        bucket: consts.AUDIO_BUCKET_NAME,
        keyFilename: "../serviceaccount.json",
        projectId: consts.PROJECT_ID,
        filename: function (req, file, cb) {
            console.log("rew")
        }
    })
});

module.exports = uploadHandler