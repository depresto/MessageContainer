
exports.renderExhibitPage = function(req, res) {
	res.render('exhibit', {
		title: 'Exhibition',
		sid: req.params.sid,
		audioPath: '/exhibitfiles/1-Audio.wav'
	})


}

exports.renderTriggerOnOff = function(req, res) {
	var trigger = req.body.trigger;

	console.log('[INFO]Sofa: ' + trigger);

	switch (trigger) {
		case 'on':
				req.app.io.to('sound1').emit('play');
				console.log('send play')
				break;
		case 'off':
				req.app.io.to('sound1').emit('stop');
				break;
	}

	res.send('Success!');
}