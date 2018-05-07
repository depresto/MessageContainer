const express = require('express');
const router = express.Router();
const index = require('../controllers/index.controller.js');

module.exports = (app) => {
  app.use('/', router);
};

// define the home page route
router.route('/')
	.get(index.renderIndex);

// define the about route
router.route('/about')
	.get(index.renderAbout);