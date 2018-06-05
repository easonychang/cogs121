
/*
 * GET home page.
 */
//var songs = require('../recentlyplayed.json');
var firebase = require('firebase');
var Lyricist = require('lyricist/node6');
var overallEmo = require('../overallEmo.json');


var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': '230d6325-2d8f-4b0c-b63a-2492560619bb',
  'password': 'fDgvgDyZUh3j',
  'version': '2018-03-16'
});

exports.viewB = function(req, res){
  console.log(overallEmo.overallEmo[0])
  res.send(overallEmo.overallEmo[0]);
}


exports.view = function(req, res){

    /**
     * Render the songs in a table form, send it to frontend.
     */
    var database = firebase.database();
    var ref = database.ref('recentlyplayed');
    var songs = " ";
    ref.on('value', snap => {
      
      songs = snap.val();
      //console.log(songs);

      res.render('mood', songs);
    });

  };


