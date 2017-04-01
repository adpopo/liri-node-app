// require stuff
var twitter = require("twitter");
var	spotify = require("spotify");
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var client = new twitter(keys.twitterKeys);


// get input
var a = process.argv[2]
var b = "";
if(process.argv.length>3){
	b += process.argv[3] + " ";
}
//log input
var log = "\r\n" + a + " " + b + "\r\n";
fs.appendFile('log.txt', log);


// parse input
function run(a, b){
	if( a == "my-tweets" ){
	//	call twitter
		tweet();
	}

	else if( a == "spotify-this-song" ){
	//	call spotify
		if(b==""){
			b = "The Sign Ace of Base";
		}
		spot(b);
	}


	else if(a == "movie-this" ){
	//	call omdb
		if(b==""){
			b = "Mr Nobody";
		}
		omdb(b);
	}

	else if(a == "do-what-it-says" ){
	//	pass txt file to parser
		fs.readFile('./random.txt', 'utf8', function(error, file){
			var arr = file.split(",");
			if(arr.length == 1){
				arr.push("");
			}
			run(arr[0], arr[1]);
		});
	}

	else{
		printLog("What? I don't understand");
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
	    for(i=0; i<20; i++){
	    	printLog(tweets[i].text);
	    }
	  }
	});
}



//	======================================================	//
//	spot()
//	function that takes 1 arg (string of a song name) and
// 	displays info on song. If blank, search for The Sign
//	======================================================	//
function spot(song){
	spotify.search({ type: 'track', query: song }, function( error, data ){
		if(!error) {
			//print artists
			var artists = "";
			for(i=0; i<data.tracks.items[0].artists.length; i++){
				artists += data.tracks.items[0].artists[i].name;
				if( i != (data.tracks.items[0].artists.length-1) ){
					artists += ", ";
				}
			}
			printLog("Artists: " + artists);

			//print song name
			printLog("Song Name: " + data.tracks.items[0].name);

			//print link
			printLog("Preview Link: " + data.tracks.items[0].preview_url);

			//print album
			printLog("Album: " + data.tracks.items[0].album.name);
		}
	});
}



//	======================================================	//
//	omdb()
//	function that takes 1 arg (string of movie name) and
// 	displays info on movie. If blank, search for Mr. Nobody
//	======================================================	//
function omdb(film){
	var theFilm = film.split(" ");
	theFilm = theFilm.join("+");
	request('http://www.omdbapi.com/?t=' + theFilm, function (error, response, body) {
		body = JSON.parse(body);
		if(!error){
			printLog("Title: " + body.Title);
		    // * Year the movie came out.
		    printLog("Year: " + body.Year);
		    // * IMDB Rating of the movie.
		    printLog("IMDB Rating: " + body.Ratings[0].Value);
		    // * Country where the movie was produced.
		    printLog("Country: " + body.Country);
		    // * Language of the movie.
		    printLog("Language: " + body.Language);
		    // * Plot of the movie.
		    printLog("Plot: " + body.Plot);
		    // * Actors in the movie.
		    printLog("Actors: " + body.Actors);
		    // * Rotten Tomatoes Rating.
		    printLog("Rotten Tomatoes Rating: " + body.Ratings[1].Value);
		    // * Rotten Tomatoes URL.
		    printLog("URL: " + body.Website);
		}
	});
}



//	======================================================	//
//	printLog()
//	function that takes 1 arg (string) and console.logs the
// 	text while also recording it to the log.txt file
//	======================================================	//
function printLog(txt){
	console.log(txt);
	fs.appendFile('log.txt', txt + "\r\n");
}

//run the damn thing
run(a, b);