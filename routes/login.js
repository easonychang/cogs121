var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var SpotifyWebApi = require('spotify-web-api-node');


var client_id = 'ab83d3f8c94d48758137e1d93d4b035d'; // Your client id
var client_secret = '28cbb4c4255b42259338616057936c40'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  
  var stateKey = 'spotify_auth_state';

exports.signin =  function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-read-private user-read-email user-top-read user-read-recently-played';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
};



exports.callback = function(req, res) {

    var spotifyApi = new SpotifyWebApi({
      clientId: client_id,
      clientSecret: client_secret,
      redirectUri: redirect_uri
    });
    
    var scope = 'user-read-private user-read-email user-top-read';
    var state = generateRandomString(16);
  
    
  
    // your application requests refresh and access tokens
    // after checking the state parameter
  
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
      res.clearCookie(stateKey);
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: code,
          redirect_uri: redirect_uri,
          grant_type: 'authorization_code'
        },
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        json: true
      };
  
      request.post(authOptions, function(error, response, body) {
        console.log("in here");
        if (!error && response.statusCode === 200) {
  
          var access_token = body.access_token,
              refresh_token = body.refresh_token;
  
          var options = {
            url: 'https://api.spotify.com/v1/me',
            headers: { 'Authorization': 'Bearer ' + access_token },
            json: true
          };
  
          spotifyApi.setAccessToken(access_token);
          spotifyApi.getMe()
            .then(function(data){
              // "Retrieved data for 
              console.log('Retrieved data for ' + data.body['display_name']);
          
              // "Email is 
              console.log('Email is ' + data.body.email);
          
              // "Image URL is 
              console.log('Image URL is ' + data.body.images[0].url);
          
              // "This user has a premium account"
              console.log('This user has a ' + data.body.product + ' account');
          })
          .catch(function(err) {
              console.log('Something went wrong', err.message);
          });

          spotifyApi.getMyRecentlyPlayedTracks()
            .then(function(data){
              console.log(data.body.items);
              
          })
          .catch(function(err) {
              console.log('Something went wrong', err.message);
          });
           
  
           // use the access token to access the Spotify Web API
           request.get(options, function(error, response, body) {
            //console.log(body);
            //console.log(body.followers.total);
  
  
  
            var obj = {
              followers: body.followers.total,
              country: body.country,
              email: body.email,
              id: body.id,
              images: body.images[0].url
            };
            
            res.render('login-index', obj);
            
          }); 

          // we can also pass the token to the browser to make requests from there
          /*res.redirect('/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            }));  */

        } else {
          res.redirect('/#' +
            querystring.stringify({
              error: 'invalid_token'
            }));
        }
  
  
      });
    }
  };