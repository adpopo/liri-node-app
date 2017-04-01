// require stuff
var twitter = require("twitter");
var	spotify = require("spotify");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var client = new Twitter(keys.twitterKeys);


// get input
var a = proccess().argv[2]
var b = proccess().argv[3]


// parse input
function run(a, b){
	if( a == "my-tweets" ){
	//	call twitter
		tweet();
	}

	else if( a == "spotify-this-song" ){
	//	call spotify
		spot(b)
	}


	else if(a == "movie-this" ){
	//	call omdb
		omdb(b)
	}

	//	pass txt file to parser
	else if(a == "movie-this" ){
	//	pass txt file to parser
		var txt = stuff.split(" ");
		run(txt[0], txt[1]);
	}
}

//	======================================================	//
//	tweet()
//	function that takes no args and prints 20 of Hoang's 
// 	latest tweets
//	======================================================	//
function tweet(){
	var params = {screen_name: 'hxuanpham'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets);
	  }
	});
}
//	======================================================	//
//	spot()
//	function that takes 1 arg (string of a song name) and
// 	displays info on song. If blank, search for The Sign
//	======================================================	//

//	======================================================	//
//	omdb()
//	function that takes 1 arg (string of movie name) and
// 	displays info on movie. If blank, search for Mr. Nobody
//	======================================================	//

//	======================================================	//
//	nike()									(just do it)
//	function that takes no args and takes
// 	latest tweets
//	======================================================	//