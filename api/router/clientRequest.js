const express = require('express');
const router = express.Router();
var loginAuth = require('../middleware/loginAuth')

router.get('/', (req, res, next) => {
    loginAuth()
})

module.exports = router