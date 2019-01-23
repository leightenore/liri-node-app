require("dotenv").config();

//Global Variables
//==============================================================================================

const axios = require("axios");
const fs = require("fs");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const keys = require("./keys.js");

let command = process.argv[2];
let userRequest = "";

//Access to keys information
const spotify = new Spotify(keys.spotify);


//Main Process
//==============================================================================================

function runCommand() {
    //Loop to replace spaces with + for search terms
    if (process.argv.length >= 4) {
        for (let i = 3; i < process.argv.length; i++) {
            if (i === process.argv.length - 1) {
                userRequest += process.argv[i];
            } else {
                userRequest += process.argv[i] + "+";
            }
        }
    };

    switch (command) {
        case "concert-this":
            axios.get("https://rest.bandsintown.com/artists/" + userRequest + "/events?app_id=codingbootcamp")
                .then(function (response) {
                    for (let i = 0; i < response.data.length; i++) {
                        console.log("Venue: " + response.data[i].venue.name + "\nLocation: " + response.data[i].venue.city + " " + response.data[i].venue.region + "\nDate: " + moment(response.data[i].datetime).format("MM/DD/YYYY, hh:mm A") + "\n--------------------------------");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            break;
        case "spotify-this-song":
            if (userRequest == "") {
                userRequest = "The Sign Ace of Base"
            }
            spotify.search({ type: 'track', query: userRequest }, function (err, response) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log("Song: " + response.tracks.items[0].name + "\nArtist(s): " + response.tracks.items[0].album.artists[0].name + "\nAlbum: " + response.tracks.items[0].album.name + "\nPreview Link: " + response.tracks.items[0].preview_url);
            });
            break;
        case "movie-this":
            
            if (userRequest == "") {
                userRequest = "Mr. Nobody"
            }
            axios.get("http://www.omdbapi.com/?t=" + userRequest + "&y=&plot=short&apikey=trilogy").then(
                function (response) {
                    console.log("Movie Title: " + response.data.Title + "\nYear: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value + "\nCountry: " + response.data.Country + "\nLanguage: " + response.data.Language + "\nPlot: " + response.data.Plot + "\nActors: " + response.data.Actors);
                }
            ).catch(err => {
                console.log(err);
            });
            break;
        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function (error, data) {
                if (error) {
                    return console.log(error);
                }

                const dataArr = data.split(",");

                command = dataArr[0];
                userRequest = dataArr[1];

                runCommand();
            });
            break;
        default:
            console.log("Please enter a valid command!");
    }
}

runCommand();

