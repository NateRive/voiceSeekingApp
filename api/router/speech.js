const express = require('express');
const router = express.Router();
// var apiAuth = require('../middleware/auth')
var Speech = require('../service/speech')
const speechService = new Speech()

// var fs = require('fs')

router.post('/', async (req, res, next) => {
    try {
        // console.log(req.query.path)
        // const buffer = await speechService.getAudioFromS3(req.query.path)
        console.log(req.body)
        const buffer = await speechService.getAudioFromS3(req.body.pathTree)
        // res.set('Content-Type', fileInfo.mimetype)
        res.send(buffer).end()
    } catch (err) {
        res.status(404).send({ error: err.stack })
    }
})

router.get('/', async (req, res, next) => {
    try {
        // console.log(req.query.path)
        const buffer = await speechService.getAudioFromS3(req.query.path)
        res.set('Content-Type', "audio/mp3")
        res.send(buffer).end()
    } catch (err) {
        res.status(404).send({ error: err.stack })
    }
})

router.get('/convert/:bucket_name/:file_name', async (req, res, next) => {
    // if (!apiAuth(req.header)) {
    //     console.log("Authentication failed");
    //     return;
    // }
    // const data = await speech.recordAudioLocation(req.param.bucket_name, req.param.file_name).catch((err) => {
    //     console.log(err)
    // })

    // s3からデータを取る処理
    // s3の代わりに固定データをモック化
    const result = await speechService.converter()
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