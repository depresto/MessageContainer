const express = require('express');
const router 	= express.Router();
const audio 	= require('../controllers/audio.controller.js');

const csrf = require('csurf')
const bodyParser = require('body-parser');
const multer  = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname+'/../public/audio')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

const csrfProtection = csrf({ cookie: true })
const parseForm = bodyParser.urlencoded({ extended: false })


module.exports = (app) => {
  app.use('/', router);
};

// Record audio
router.route('/record/:pid')
	.get(csrfProtection, audio.renderRecord);

// Play audio
/*
router.route('/play/:pid')
	.get(audio.renderPlay);
*/

router.route('/generate')
	.get(audio.renderGenerate);

router.route('/api/record')
	.post(upload.any(), parseForm, csrfProtection, audio.renderAPIRecord);
