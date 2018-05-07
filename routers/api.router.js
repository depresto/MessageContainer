const express 		=	require('express');
const router 			= express.Router();
const api 				= require('../controllers/api.controller.js');
const socket_io   = require("socket.io");
const io          = socket_io();
const socketioAPI = require('../socketio/socketio')(io);

module.exports = (app) => {
	app.io = io;
  app.use('/api', router);
};

router.route('/a')
	.post(api.renderUploadText);

router.route('/b')
	.post(api.renderUploadAudio);

router.route('/c')
	.post(api.renderUploadImage);