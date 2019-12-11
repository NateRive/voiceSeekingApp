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


module.exports = router