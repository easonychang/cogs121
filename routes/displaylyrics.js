
/*
 * GET home page.
 */
var firebase = require('firebase');
var Lyricist = require('lyricist/node6');

var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '230d6325-2d8f-4b0c-b63a-2492560619bb',
  'password': 'fDgvgDyZUh3j',
  'version': '2018-03-16'
});

exports.view = function(req, res){
    const songIndex = req._parsedOriginalUrl.query;
    

    var database = firebase.database();
    var ref = database.ref('recentlyplayed');
    var songs = " ";
    ref.on('value', snap => {
      
      songs = snap.val();
      
    });

    console.log(songs.songs[songIndex].name);

    //GET lyrics
    var accessToken = 'Dd3-2dZAw-MZnId7W0V-cSHAdRP1mR72k3YE3CKTqZj6PHan4NlotPg3VW5X_yVN';
    const lyricist = new Lyricist(accessToken);
    var songName = songs.songs[songIndex].name.split("-")[0];
    var query = songName  + " " + songs.songs[songIndex].artist;
    //console.log(query);

    //Searching for the song
    lyricist.search(query)
      .then(response => {
        //console.log(response[0].full_title);
        console.log(response[0].id);
        var songID = response[0].id;
        lyricist.song(songID, { fetchLyrics: true })
        .then(songlyric => {
          
          //console.log(songlyric.lyrics);

          /* Parameters passed in to the natural language process*/
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

                /*Pairing emotions with the lyrics, send it to the frontend*/
                const displayObj = {
                  'emotions': response.emotion.document.emotion,
                  'lyrics': parameters.text
                };

                ///console.log(displayObj);

                res.send(displayObj);
            }
          });
        });
        
        

      });



    

    
  };