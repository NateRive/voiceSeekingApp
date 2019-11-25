const express = require('express');
const router = express.Router();
var wordService = require('../service/word')

router.get('/:fileId', async (req, res, next) => {
  console.log(req.params.fileId)
  var sentence = await new wordService(req.params.fileId).makeSentence()
  res.json(sentence)
})


module.exports = router