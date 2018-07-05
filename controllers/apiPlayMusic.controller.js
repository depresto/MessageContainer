/**
	展場用
	播放5軌聲音到不同的音箱，每個音箱播一軌的聲音。
	另外三軌播放預錄好的音檔（2個一般音箱＋1個低音音箱）
	其中兩軌播放觀者錄音（2個一般音箱）

	音訊範例
	data:audio/mpeg;base64,iVBORw0KGgoAAAA
**/

const redis 			= require("redis"),
    	client 			= redis.createClient();
const fs 					= require('fs');

function uploadMusic(req, res, mid) {
	var rawFile 	= req.body.VoiceFile;

	if (!rawFile) {

		res.send('CodeType=00');	
		
	}
	else {

		file64 		= rawFile.split(',')[1];
		file 			= Buffer.from(file64, 'base64');
		filename 	= mid.toString();
		extension = rawFile.split(';')[0].split('/')[1];

		filename  = filename + '.' + extension;
		console.log(filename)

		fs.writeFile(__dirname + "/../public/upload/" + filename, file, function(err) {
	    if(err) {
        console.log(err);

        res.send('CodeType=00');
        return;
	    }

	    res.send('CodeType=01');
		}); 
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

    uploadMusic(req, res, val);

    client.set(key, val, redis.print);
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
      	filename  = mid.toString() + '.mpeg';
      } else {
      	currentID = val - (4 - mid);
      	filename  = currentID.toString() + '.mpeg';
      }

      res.send('FilePath=' + filename);
    }


	});
}