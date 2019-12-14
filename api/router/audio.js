const express = require('express');
const router = express.Router();
const WordService = require("../service/word");
const wordService = new WordService()

router.get('/:audioId', async (req, res, next) => {
    var audios = await wordService.getWordsByAudioId(req.params.audioId)
    res.json(audios)
})


module.exports = router