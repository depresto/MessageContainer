const express 			=	require('express');
const router 				= express.Router();
const api 					= require('../controllers/api.controller.js');
const apiPlayMusic 	= require('../controllers/apiPlayMusic.controller.js');
const exhibit 			= require('../controllers/exhibit.controller.js');
const socket_io   	= require("socket.io");
const io          	= socket_io();
const socketioAPI 	= require('../socketio/socketio')(io);

module.exports = (app) => {
	app.io = io;
  app.use('/', router);
};

router.route('/api/a')
	.post(api.renderUploadText);

router.route('/api/b')
	.post(api.renderUploadAudio);

router.route('/api/c')
	.post(api.renderUploadImage);

router.route('/api/uploadMusic')
	.post(apiPlayMusic.renderUploadMusic);

router.route('/api/getMusic/:mid')
	.get(apiPlayMusic.renderGetMusic);



router.route('/exhibit/:sid')
	.get(exhibit.renderExhibitPage);

router.route('/_admin/:pass')
	.get(exhibit.renderAdmin);

router.route('/_admin/:pass/:command')
	.get(exhibit.renderAdminCommand);

router.route('/switch')
	.post(exhibit.renderTriggerOnOff);
