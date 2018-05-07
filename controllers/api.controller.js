const base64      = require('base64-stream');
const crypto 			= require('crypto');
const fs 					= require('fs');

function uploadItems(req, res, type) {
	var deviceId 	= req.body.DeviceId;
	var content 	= req.body.Content;

	console.log('emit to: '+deviceId);

	if (!deviceId || !content || !type) {

		res.send('CodeType=00');	
		
	}
	else {

		if (type == 'text') {
			req.app.io.to(deviceId).emit('get text',content);
		}
		else {
			rawFile = null;

			switch (type) {
				case 'audio':
					rawFile = req.body.VoiceFile;
					break;
				case 'image':
					rawFile = req.body.ImgFile;
					break;
			}

			file64 		= rawFile.split(',')[1];
			file 			= Buffer.from(file64, 'base64');
			filename 	= crypto.createHash('md5').update(file).digest("hex");
			extension = rawFile.split(';')[0].split('/')[1];

			filename  = filename + '.' + extension;
			console.log(filename)

			fs.writeFile(__dirname + "/../public/upload/" + filename, file, function(err) {
		    if(err) {
		        console.log(err);

		        res.send('CodeType=00');
		        return;
		    }

		    req.app.io.to(deviceId).emit('get ' + type, {
		    	content: 	content,
		    	url: 			'/upload/' + filename
		    });
		    res.send('CodeType=01');
			}); 

		}
	}
}

exports.renderUploadText = function(req, res) {

	uploadItems(req, res, 'text');

}

exports.renderUploadAudio = function(req, res) {
	var voicefile = req.body.VoiceFile;

	if (!voicefile) {
		uploadItems(req, res, undefined);
	}
	else {
		uploadItems(req, res, 'audio');
	}
}

exports.renderUploadImage = function(req, res) {
	var imgfile		= req.body.ImgFile;

	if (!imgfile) {
		uploadItems(req, res, undefined);
	}
	else {
		uploadItems(req, res, 'image');
	}
}