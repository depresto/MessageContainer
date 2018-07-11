
exports.renderTriggerOnOff = function(req, res) {
	var trigger = req.params.trigger;

	console.log(req.params);
	console.log(trigger)
	res.send('Success!');
}