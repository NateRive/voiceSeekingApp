const express = require('express');
const router = express.Router();
var workspaceService = require('../service/workspace')
var pageService = require('../service/page')

router.get('/', async (req, res, next) => {
  var workspaceList = await new workspaceService().getWorkspaceList()
  res.json(workspaceList)
})

router.get('/:id', async (req, res, next) => {
  var pages = await new pageService().getPages(req.params.id)
  res.json(pages)
})


module.exports = router