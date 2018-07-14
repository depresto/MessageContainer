var express 				= require('express');
var glob 						= require('glob');
var expressLayouts 	= require('express-ejs-layouts');
var app 						= express();
var morgan 					= require('morgan');
var cookieParser 		= require('cookie-parser')
var csrf 						= require('csurf')
var bodyParser 			= require('body-parser');
var cors 						= require('cors')
var socket_io    		= require('socket.io');
var io 							= socket_io();

var handler 				= require('./config/handler');

app.use(cors())

app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(cookieParser())
app.use(bodyParser.json({limit: '50mb'})); // support json encoded bodies
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 })); // support encoded bodies

app.set('layout', 'layouts/layout');

var routes = glob.sync(__dirname + '/routers/*.js');
routes.forEach((routers) => {
  require(routers)(app);
});

app.use(express.static(__dirname + '/public'));

app.use(handler.handlerCSRFError);

app.use(morgan('tiny'));

let server = app.listen(2375, function () {
  console.log('App listening on port 2375!');
});

var io     = app.io
io.attach(server);