const express = require('express');
const router = express.Router();
// var apiAuth = require('../middleware/auth')
var Speech = require('../service/speech')
// var fs = require('fs')

router.get('/:bucket_name/:file_name', async (req, res, next) => {
    const speech = new Speech(req.params.bucket_name, req.params.file_name)
    // if (!apiAuth(req.header)) {
    //     console.log("Authentication failed");
    //     return;
    // }
    // const data = await speech.recordAudioLocation(req.param.bucket_name, req.param.file_name).catch((err) => {
    //     console.log(err)
    // })

    // s3からデータを取る処理
    // s3の代わりに固定データをモック化
    const result = await speech.converter()
        // .then(function(parsedData) {
        //     awsObject.recordAudioLocation
        //     awsObject.writeData(parsedData)
        // })
        // .catch(function(error) {
        //     console.log(error)
        // })
    console.log('finished my jobs')
    res.json(result)
})

// router.post('/:bucket_name/:file_name')

module.exports = router