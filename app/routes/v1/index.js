'use strict';

let express = require('express')
let router = express.Router()
let permission = require('../../lib/permission')


/**
 * Public Routing.
 */

router.use('/auth', require('./auth'))


/**
 * Authenticated Routing.
 */

router.use('/friends', permission.authorization(), require('./friends'));
router.use('/users', permission.authorization(), require('./users'));


module.exports = router;
