
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');


var client_id = 'ab83d3f8c94d48758137e1d93d4b035d'; // Your client id
var client_secret = '28cbb4c4255b42259338616057936c40'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri







var index = require('./routes/index');
var home = require('./routes/home');
var mood = require('./routes/mood');
var setting = require('./routes/setting');
var playlists = require('./routes/playlists');
var login = require('./routes/login');
var getSong = require('./routes/getSong');

// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', index.view);
app.get('/home', home.view);
app.get('/mood', mood.view);
app.get('/setting', setting.view);
app.get('/playlists', playlists.view);
app.get('/getSong', getSong.view);
// Example route
// app.get('/users', user.list);


app.use(express.static(__dirname + '/public')).use(cookieParser());

app.get('/login', login.signin);

app.all('/callback', login.callback);

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
