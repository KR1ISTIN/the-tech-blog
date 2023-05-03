// file containing the routes for user and dashboard

const router = require('express').Router();

const userRoutes = require('./user');
const dashboardRoutes = require('./dashboard');

router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
