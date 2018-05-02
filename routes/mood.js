
/*
 * GET home page.
 */
var songs = require('../recentlyplayed.json');


exports.view = function(req, res){
    res.render('mood', songs);
  };