var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var client_id = 'ab83d3f8c94d48758137e1d93d4b035d'; // Your client id
var client_secret = '28cbb4c4255b42259338616057936c40'; // Your secret
var redirect_uri = 'http://localhost:3000/home'; // Your redirect uri
var SpotifyWebApi = require('spotify-web-api-node');

var overallEmo = require('../overallEmo.json');

var Lyricist = require('lyricist/node6');

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '230d6325-2d8f-4b0c-b63a-2492560619bb',
  'password': 'fDgvgDyZUh3j',
  'version': '2018-03-16'
});


var firebase = require('firebase');
// Initialize Firebase
var config = {
  apiKey: "AIzaSyBvWcAaeczS12VRY__XiOXQMBD6hd3dAH0",
  authDomain: "spotimood.firebaseapp.com",
  databaseURL: "https://spotimood.firebaseio.com",
  projectId: "spotimood",
  storageBucket: "spotimood.appspot.com",
  messagingSenderId: "723908026631"
};
firebase.initializeApp(config);

// Get a database reference to our blog
var database = firebase.database();

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

exports.view = function(req, res){
  /**
   * using the spotify web api wrapper
   */
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

        /**
         * Getting the users' basic information
         */
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

        /**
         * Getting the users' most recently played 20 songs, and populate the database
         */
        spotifyApi.getMyRecentlyPlayedTracks()
          .then(function(data){
            

            for( [index, e] of data.body.items.entries()){

              console.log(e.track.album.images[2].url);

              songObj = {
                'name': e.track.name,
                'artist': e.track.artists[0].name,
                'duration': millisToMinutesAndSeconds(e.track.duration_ms),
                'songid': e.track.id,
                'imageurl': e.track.album.images[1].url
              };
              
              songsDB.songs.push(songObj);

            }
            
            var ref = database.ref('recentlyplayed');
            ref.set(songsDB);
            
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
          
          res.render('home', obj);
          
        }); 


      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }


    });
  }

    /**
     * Getting the overall emotions of all the songs in the database
     */
    var ref = database.ref('recentlyplayed');
    var songs = " ";
    ref.on('value', snap => {
      
      songs = snap.val();

      var emotion = {
        sadness: 0,
        joy: 0,
        fear: 0,
        disgust: 0,
        anger: 0
      }
      
      for(var songIndex = 1; songIndex < 20; songIndex++){

        var accessToken = 'Dd3-2dZAw-MZnId7W0V-cSHAdRP1mR72k3YE3CKTqZj6PHan4NlotPg3VW5X_yVN';
        const lyricist = new Lyricist(accessToken);
        var songName = songs.songs[songIndex].name.split("-")[0];
        var query = songName  + " " + songs.songs[songIndex].artist;
        lyricist.search(query)
          .then(response => {
            //console.log(response[0].full_title);
            console.log(response[0].id);
    
            var songID = response[0].id;
    
    
            lyricist.song(songID, { fetchLyrics: true })
            .then(songlyric => {
              
              //console.log(songlyric.lyrics);
              var parameters = {
                'text': songlyric.lyrics,
                'features': {
                  'emotion': {
                    'document': true
                  }
                }
              };
              
              natural_language_understanding.analyze(parameters, function(err, response) {
                if (err){
                    console.log('error:', err);
                }
                else {
                    //console.log(JSON.stringify(response, null, 2));
    
                    emotion.sadness += response.emotion.document.emotion.sadness;
                    emotion.joy += response.emotion.document.emotion.joy;
                    emotion.fear+= response.emotion.document.emotion.fear;
                    emotion.disgust+= response.emotion.document.emotion.disgust;
                    emotion.anger+= response.emotion.document.emotion.anger;
                    
                    overallEmo.overallEmo.push(emotion);
                }

              });
            });
    
          });
        }
        
    });

    
    
  };