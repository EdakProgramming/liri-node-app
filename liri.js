// Dependencies
var keys = require("./keys.js");
var Twitter = require("twitter");
var spotify = require("spotify");
var request = require("request");
var imdb = require("imdb-api");
var fs = require("fs");

// Functions
function getTweets() {

    var client = new Twitter(keys.twitterKeys);
    var params = { screen_name: "EdAkProgramming" };
    client.get("statuses/user_timeline", params, function(error, tweets, response) {
        if (error) throw error;
        for (var i = 0; i < tweets.length; i++) {
            console.log("Created at: " + tweets[i].created_at + "\n");
            console.log("Text: " + tweets[i].text);
            console.log("___________________________________________");
        }
    });
};
//   * This will show your last 20 tweets and when they were created at in your terminal/bash window.

var getSongInfo = function(songName) {
    if (songName === undefined) {
        songName = "Thunderstruck";
    }

    spotify.search({
        type: "track",
        query: songName
    }, function(err, data) {
        if(err) {
            console.log("Error occurred: " + err);
            return
        }
        console.log(data);
        // var songs = data.tracks;

        // * This will show the following information about the song in your terminal/bash window
        //   * Artist(s)
        //   * The song's name
        //   * A preview link of the song from Spotify
        //   * The album that the song is from
        // for (var i = 0; i < songs.length; i++) {
        //   console.log("Artist: " + songs[i].artists.map(getArtistNames));
        //   console.log("Title: " + songs[i].name);
        //   console.log("Preview song: " + songs[i].preview_url);
        //   console.log("Album: " + songs[i].album.name);
        //   console.log("-----------------------------------");
        // }
    });
};

// This API has gone private and now requires the user to pay-to-play :-P
function getMovieInfo() {
    var movieName = Movie.title
    if (movieName === undefined) {
        movieName = "Silence of the Lambs";
    }
    // * This will output the following information to your terminal/bash window:
    //     * Title of the movie.
    //     * Year the movie came out.
    //     * IMDB Rating of the movie.
    //     * Country where the movie was produced.
    //     * Language of the movie.
    //     * Plot of the movie.
    //     * Actors in the movie.
    //     * Rotten Tomatoes Rating.
    //     * Rotten Tomatoes URL.

    var searchParam = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&r=json";
    request(searchParam, function(error, response, body) {
        if(!error && response.statusCode === 200) {
            var jsonData = JSON.parse(body);
            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rated: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.Language);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotton Tomatoes URL: " + jsonData.tomatoURL);
                }
    }); //End of request

}; // End of getMovieInfo

function doAsISay() {
    fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } 
    else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }

  });
};

// Function for choosing which option to run

var pick = function(caseData, functionData) {
    switch (caseData) {
        case "tweets":
            getTweets();
            break;
        case "spotify":
            getSongInfo();
            break;
        case "movie":
            getMovieInfo();
            break;
        case "file":
            doAsISay();
            break;
        default:
            console.log("Pick one of the options given");
    }
};

// The function below allows the user to pick their choce and enter arguments
var letsGo = function(arg1, arg2) {
    pick(arg1, arg2);
};

// Main Process

letsGo(process.argv[2], process.argv[3]);
