
/*
 * GET home page.
 */

exports.view = function(req, res){
    var song = {
        "song": "Perfect",
        "artist": "Ed Sheeran",
        "album": "Divide",
        "albumimg": "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png"
    };
    res.send(song);
  };