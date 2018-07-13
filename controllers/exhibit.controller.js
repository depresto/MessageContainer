const redis 			= require("redis"),
    	client 			= redis.createClient();

exports.renderExhibitPage = function(req, res) {
	res.render('exhibit', {
		title: 'Exhibition',
		sid: req.params.sid,
		audioPath: '/exhibitfiles/1-Audio.wav'
	})
}

exports.renderAdmin = function(req, res) {
	var password = '123456'

	if (req.params.pass == password) {
		res.render('admin', {
			title: 'Admin'
		})
	}
	else {
		res.send('Admin');
	}
}

exports.renderAdminCommand = function(req, res) {
	var password = '123456';
	var key = "mc-currentMode";

	if (req.params.pass == password) {
		now  = Date.now()
		halfSecondAfter = now + 100;
		data = {
			'timestamp': halfSecondAfter
		};

		if (req.params.command == 'performmode') {
			client.set(key, 'performmode', redis.print);

			for (var i=1; i<=4; i++) {
				data['url'] = '/exhibitfiles/' + i +'-Audio.wav';
				req.app.io.to('sound'+i).emit(req.params.command, data);
			}
		}
		else if (req.params.command == 'exhibitionmode') {
			client.set(key, 'exhibitionmode', redis.print);

			// TODO: exhibit
			data['url'] = '/exhibitfiles/test.mp3';
			for (var i=1; i<=4; i++) {
				req.app.io.to('sound'+i).emit(req.params.command, data);
			}
		}
		else {
			if (req.params.command == 'changeaudio') {
				data['url'] = '/exhibitfiles/test.mp3';
			}

			for (var i=1; i<=4; i++) {
				req.app.io.to('sound'+i).emit(req.params.command, data);
			}
		}

		/*
		switch (req.params.command) {
			case 'play':
				req.app.io.to('sound1').emit('play');
				break;
			case 'stop':
				req.app.io.to('sound1').emit('stop');
				break;
			case 'stopnow':
				req.app.io.to('sound1').emit('stopnow');
				break;
			case 'changeaudio':
				data = {
					'url': '/exhibitfiles/test.mp3'
				}
				req.app.io.to('sound1').emit('changeaudio', data);
				break;
			case 'defaultaudio':
				req.app.io.to('sound1').emit('defaultaudio');
				break;

		}
		*/
		console.log('[INFO]admin '+req.params.command);
		res.send('OK');
	}
	else {
		res.send('Admin');
	}
}

exports.renderTriggerOnOff = function(req, res) {
	var trigger = req.body.trigger;

	console.log('[INFO]Sofa: ' + trigger);

	now  = Date.now()
	halfSecondAfter = now + 100;
	data = {
		'timestamp': halfSecondAfter
	};

	switch (trigger) {
		case 'on':
				for (var i=1; i<=4; i++) {
					req.app.io.to('sound'+i).emit('play', data);
				}
				console.log('[INFO]send play')
				break;
		case 'off':
				for (var i=1; i<=4; i++) {
					req.app.io.to('sound'+i).emit('stop', data);
				}
				break;
	}

	res.send('Success!');
}