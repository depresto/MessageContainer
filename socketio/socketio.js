module.exports = function(io){

	io.on('connection', function(socket){
		console.log('A user connected');

		var deviceId = '';
		var sid = null;

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
			sid = data.sid;

			socket.join(data.sid); // Sound ID
			io.to('admin').emit('userjoin', data);
		})

		socket.on('joinadmin', function (data) {
			console.log('join admin');
			
			socket.join('admin'); // Sound ID
		})

		socket.on('disconnect', function(){
      console.log('user disconnected');

      if (sid) {
      	io.to('admin').emit('userexit', {sid: sid});
      }
    });

	});

}
