# LIRI Node App

## Description 

LIRI is a command line interface application that uses the Spotify API to search for songs, the Bands in Town API for concerts, and the OMDB API for movies.

## How To Use LIRI

### Commands

* #### concert-this
LIRI uses the Bands in Town Artist Events API to show information about an artist's upcoming shows.

![concert-this-example](./screenshots/concert-this.png)

* #### spotify-this-song
LIRI utilizes the node-spotify-api package to retrieve song information from the Spotify API. If no song is provided, LIRI will default to "The Sign" by Ace of Base.

![spotify-this-song-example](./screenshots/spotify-this-song.png)

* #### movie-this
LIRI retrieves data about a movie from the OMBD API.  If no movie is provided, LIRI will default to Mr. Nobody.

![movie-this-example](./screenshots/movie-this.png)

* #### do-what-it-says
LIRI will read the random.txt file and do what it says. The default example will run the spotify-this-song command for the song "I Want It That Way" by The Backstreet Boys.


### Technologies Utilized

* HTML
* CSS
* JavaScript
* Node.js
* NPM Packages:
  * Dotenv
  * Axios
  * Node-Spotify-API
  * Moment

