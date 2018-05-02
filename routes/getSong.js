
/*
 * GET home page.
 */
var firebase = require('firebase');

exports.view = function(req, res){
    /*var song = {
        "song": "Perfect",
        "artist": "Ed Sheeran",
        "album": "Divide",
        "albumimg": "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png"
    }; */

    var database = firebase.database();
    var ref = database.ref('recentlyplayed');
    var recentlyplayed = " ";
    ref.on('value', snap => {
      
      recentlyplayed = snap.val();
      console.log(recentlyplayed.songs);
      res.send(recentlyplayed.songs);
    });

    

    
  };