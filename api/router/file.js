const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer')

var fileManager = require('../service/fileManager')

// 指定したパスにあるgcp上の音声ファイルの署名つきURLを生成する処理
router.get('/', async (req, res, next) => {
  const url = await new fileManager().getSignedURL(req.query.path)
  // res.set('Cache-Control', 'private, max-age=3600');
  res.status(200).send(url).end()
})

router.post('/', upload.any(), async (req, res, next) => {

})


module.exports = router