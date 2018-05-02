
/*
 * GET home page.
 */
//var songs = require('../recentlyplayed.json');
var firebase = require('firebase');

// Initialize Firebase
/*var config = {
  apiKey: "AIzaSyBvWcAaeczS12VRY__XiOXQMBD6hd3dAH0",
  authDomain: "spotimood.firebaseapp.com",
  databaseURL: "https://spotimood.firebaseio.com",
  projectId: "spotimood",
  storageBucket: "spotimood.appspot.com",
  messagingSenderId: "723908026631"
};
firebase.initializeApp(config); */

// Get a database reference to our blog


exports.view = function(req, res){
    var database = firebase.database();
    var ref = database.ref('recentlyplayed');
    var songs = " ";
    ref.on('value', snap => {
      
      songs = snap.val();
      console.log(songs);
    });
    res.render('mood', songs);
  };