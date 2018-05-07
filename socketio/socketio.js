module.exports = function(io){

	io.on('connection', function(socket){
	    console.log('A user connected');
	    socket.on('disconnect', function(){
	        console.log('user disconnected');
	    });
	});

	io.on('connection', function(socket){

		var deviceId = '';

		socket.on('test', function(){
			console.log('test');
			socket.emit('test', {'message': 'hello'});
		});
		
		socket.on('join', function (data) {
			deviceId = data.deviceId;

			socket.join(data.deviceId);
		});

	});

}
