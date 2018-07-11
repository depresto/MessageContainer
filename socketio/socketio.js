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
			deviceId = data.deviceId; // App device ID
			console.log('join:'+deviceId);

			socket.join(data.deviceId);
		});

		socket.on('joinexhibit', function (data) {
			console.log('join exhibit ID: '+data.sid);
			
			socket.join(data.sid); // Sound ID
		})

	});

}
