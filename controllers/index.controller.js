
exports.renderIndex = function(req,res){  

	res.render('index', {
    title: 'Message Container'
  });

};

exports.renderAbout = function(req, res) {

	res.render('about', {
    title:    'About | Message Container'
  });

}