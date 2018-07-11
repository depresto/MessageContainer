const express = require('express');
const router = express.Router();
const exhibit = require('../controllers/exhibit.controller.js');

module.exports = (app) => {
  app.use('/', router);
};

router.route('/switch')
	.post(exhibit.renderTriggerOnOff);