
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

	if (req.params.pass == password) {
		switch (req.params.command) {
			case 'play':
				req.app.io.to('sound1').emit('play');
				console.log('[INFO]admin send play')
				break;
			case 'stop':
				req.app.io.to('sound1').emit('stop');
				console.log('[INFO]admin send stop')
				break;
			case 'stopnow':
				req.app.io.to('sound1').emit('stopnow');
				console.log('[INFO]admin send stopnow')
				break;
		}
		res.send('OK');
	}
	else {
		res.send('Admin');
	}
}

exports.renderTriggerOnOff = function(req, res) {
	var trigger = req.body.trigger;

	console.log('[INFO]Sofa: ' + trigger);

	switch (trigger) {
		case 'on':
				req.app.io.to('sound1').emit('play');
				console.log('[INFO]send play')
				break;
		case 'off':
				req.app.io.to('sound1').emit('stop');
				break;
	}

	res.send('Success!');
}