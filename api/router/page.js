const express = require('express');
const router = express.Router();
var pageService = require('../service/page')

router.get('/', async (req, res, next) => {
    var pages = await new pageService().getPages()
    res.json(pages)
})


module.exports = router