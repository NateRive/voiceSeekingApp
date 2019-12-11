const express = require('express');
const router = express.Router();

router.get('pages/parent/:id', async (req, res, next) => {
    var pages = await pageService.getPagesByParentId(req.params.id)
    res.json(pages)
})


module.exports = router