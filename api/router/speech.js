const express = require('express');
const router = express.Router();
// var apiAuth = require('../middleware/auth')
var Speech = require('../service/speech')
const speechService = new Speech()
const PREVIEW = "preview"

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
        const buffer = await speechService.getAudioFromS3(req.query.path, req.headers.range)
        res.set('Content-Type', buffer.ContentType)
        res.set('Content-Range', buffer.ContentRange)
        // res.set('ContentLength', data.ContentLength)
        res.status(206).send(buffer.Body).end()
    } catch (err) {
        res.status(404).send({ error: err.stack })
    }
})

if (process.env.NODE_ENV != PREVIEW) {
    router.get('/convert/:bucket_name/:file_name', async (req, res, next) => {
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
}

// router.post('/:bucket_name/:file_name')

module.exports = router