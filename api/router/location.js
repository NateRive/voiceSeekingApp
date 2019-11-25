const express = require('express');
const router = express.Router();
var locationService = require('../service/location')

router.get('/', async (req, res, next) => {
    var locations = await new locationService().getLocations()
    res.json(locations)
})


module.exports = router