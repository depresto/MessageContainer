/**
	展場用
	播放5軌聲音到不同的音箱，每個音箱播一軌的聲音。
	另外三軌播放預錄好的音檔（2個一般音箱＋1個低音音箱）
	其中兩軌播放觀者錄音（2個一般音箱）

	音訊範例為 .wav 檔案
**/

const redis 			= require("redis"),
    	client 			= redis.createClient();
const fs 					= require('fs');
// const formidable 	= require('formidable');

function uploadMusic(req, res, mid) {

	/*
	var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files) {
      // `file` is the name of the <input> field of type `file`

      if (files.VoiceFile) {

	      var old_path 	= files.VoiceFile.path,
	          file_size = files.VoiceFile.size,
	          file_ext 	= files.VoiceFile.name.split('.').pop(),
	          // index = old_path.lastIndexOf('/') + 1,
	          // file_name = old_path.substr(index),
	          filename 	= mid.toString();
	          new_path 	= __dirname + "/../public/upload/" + filename + '.' + file_ext;

	      fs.readFile(old_path, function(err, data) {
	          fs.writeFile(new_path, data, function(err) {
	              fs.unlink(old_path, function(err) {
	              	if (err) {
	                    res.status(500);
	                    res.send('CodeType=00');
	                } else {
			              	client.get('mc-currentMode', function(err, reply) {
			              		now  = Date.now()
												halfSecondAfter = now + 100;
			              		sendData = {
													'timestamp': halfSecondAfter
												};

		              			var sendURL = [
													null,
													'/exhibitfiles/default_exhibit.wav',
													'/exhibitfiles/default_exhibit.wav',
													'/exhibitfiles/default_exhibit.wav'
												]

												console.log('[INFO]currentID=' + mid);

			              		if (reply == 'exhibitionmode') {
				              		if (mid == 1) {
										      	sendURL[2] = sendURL[3] = '/upload/' + mid +'.wav';
										      } 
										      else {
										      	sendURL[2] = '/upload/' + (mid - 1) + '.wav';
										      	sendURL[3] = '/upload/' + mid +'.wav';
										      }
			              		}
			              		else {
			              			sendURL[1] = '/exhibitfiles/perform.wav';
			              		}

									      for (var i=1; i<=3; i++) {
													sendData['url'] = sendURL[i];
													req.app.io.to('sound'+i).emit('changeaudio', sendData);
												}

												console.log('[INFO]Send exhibit audio.');

		                    res.status(200);
		                    res.send('CodeType=01');
			                  
			                });
	                }
	              });
	          });
	      });
	    }
	    else {
	    	res.status(500);
				res.send('CodeType=00');
	    }
  });
 	*/

 	var VoiceFile 		= req.file;
 	var filepath 			= __dirname + "/../public/upload/" + mid + '.wav';

 	if (VoiceFile) {
 		fs.writeFile(filepath, VoiceFile, function(err) {
      	if (err) {
            res.status(500);
            res.send('CodeType=00');

            return false;
        } else {
          	client.get('mc-currentMode', function(err, reply) {
          		now  = Date.now()
							halfSecondAfter = now + 100;
          		sendData = {
								'timestamp': halfSecondAfter
							};

        			var sendURL = [
								null,
								'/exhibitfiles/default_exhibit.wav',
								'/exhibitfiles/default_exhibit.wav',
								'/exhibitfiles/default_exhibit.wav'
							]

							console.log('[INFO]currentID=' + mid);

          		if (reply == 'exhibitionmode') {
            		if (mid == 1) {
					      	sendURL[2] = sendURL[3] = '/upload/' + mid +'.wav';
					      } 
					      else {
					      	sendURL[2] = '/upload/' + (mid - 1) + '.wav';
					      	sendURL[3] = '/upload/' + mid +'.wav';
					      }
          		}
          		else {
          			sendURL[1] = '/exhibitfiles/perform.wav';
          		}

				      for (var i=1; i<=3; i++) {
								sendData['url'] = sendURL[i];
								req.app.io.to('sound'+i).emit('changeaudio', sendData);
							}

							console.log('[INFO]Send exhibit audio.');

              res.status(200);
              res.send('CodeType=01');

              return true;
              
            });
        }
  	});
 	}
 	else {
  	res.status(500);
		res.send('CodeType=00');

		return false;
  }

}

exports.renderUploadMusic = function(req, res) {
	var key = "mc-currentCount";

	client.get(key, function(err, reply) {
		var val;

    if (reply == null) {
      val = 0;
    } else {  
      val = parseInt(reply);
    }

    val = val + 1;

    succees = uploadMusic(req, res, val);

    if (succees) {
    	client.set(key, val, redis.print);
    }
	});
}

exports.renderGetMusic = function(req, res) {
	var key = "mc-currentCount";
	var mid = parseInt(req.params.mid);

	client.get(key, function(err, reply) {

    if (reply == null) {

      res.send('FilePath=None');

    } else {  

      var val = parseInt(reply);

      if (val < 5) {
      	filename  = mid.toString() + '.wav';
      } else {
      	currentID = val - (4 - mid);
      	filename  = currentID.toString() + '.wav';
      }

      res.send('FilePath=' + filename);
    }


	});
}