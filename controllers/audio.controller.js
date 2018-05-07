const crypto = require('crypto');
const redis = require("redis"),
    	client = redis.createClient();


exports.renderRecord = function(req, res) {
  var key = 'mc-' + req.params.pid;

  client.get(key, function(err, reply) {
    var val = parseInt(reply);

    if (reply == null) {
      res.render('error', {
        title:    'Error | Message Container',
        message:  'wrong page ID'
      })
    } else {  
      res.render('record', {
        title:      'Record | Message Container',
        pageid:     req.params.pid,
        pageval:    val,
        csrfToken:  req.csrfToken()
      });
    }
  });
};

exports.renderPlay = function(req, res) {
  key = 'mc-' + req.params.pid;

  client.get(key, function(err, reply) {
    // reply is null when the key is missing
    if (reply == null) {
      res.render('error', {
        title:    'Error | Message Container',
        message:  'wrong page ID'
      })
    } else if (reply == '0') {
      res.render('error', {
        title:    'Error | Message Container',
        message:  'No record founded.'
      })
    } else {     
      res.render('play', {
        title:    'Play record | Message Container',
        pageid:   req.params.pid,
        filename: 'mc-' + req.params.pid + '.wav'
      });
    }
  });

}

exports.renderGenerate = function(req, res) {
  buf   = crypto.randomBytes(16);
  hash  = buf.toString('hex');

  key   = 'mc-' + hash;

  client.set(key, "0", redis.print);
  // hash  = crypto.createHash('sha256').update(buf).digest('hex');
  // console.log(hash)

  res.render('qrcode', {
    title:    'Generate | Message Container',
    pageid:   hash
  });
}

exports.renderAPIRecord =  function(req, res) {
    var page_id 			= req.body.id;
    var audiofilename = req.body.audiofilename;
    var audioblob 		= req.files.audioblob;

    var key = 'mc-' + req.body.id;

	console.log("filename: "+audiofilename);

    client.get(key, function(err, reply) {
      var val;

      if (reply == null) {
        val = 0;
      } else {  
        val = parseInt(reply);
      }

      val = val + 1;
      client.set(key, val, redis.print);
      res.end(req.body.id);
    });
};