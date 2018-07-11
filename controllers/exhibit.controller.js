
exports.renderTriggerOnOff = function(req, res) {
	var trigger = req.body.trigger;

	console.log(req.body);
	console.log(trigger)
	res.send('Success!');
}