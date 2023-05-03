const router = require('express').Router();

const apiRoutes = require('./api');
const home = require('./home');

router.use('/', home);// home-routes file

router.use('/main', apiRoutes);//api folder


module.exports = router;
