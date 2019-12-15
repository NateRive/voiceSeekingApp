const express = require('express');
const router = express.Router();
const AudioService = require("../service/audio");
const audioService = new AudioService()
const PageService = require('../service/page')
const pageService = new PageService()

router.get('/parent/:id', async (req, res, next) => {
    var pages = await pageService.getPagesByParentId(req.params.id)
    res.json(pages)
})

router.get('/:id', async (req, res, next) => {
    var audios = await audioService.getAudiosByPageId(req.params.id)
    res.json(audios)
})

router.post('/', async (req, res, next) => {
    var page = await pageService.createPage(req.body)
    res.json(page)
})


module.exports = router