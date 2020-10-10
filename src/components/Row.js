import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "./axios"; // axios is the renamed component, instance (when you export as default you can name it whatever)

// console.log() is great but console.table() is sick for arrays and objects!
// RFCE or RAFCE
// Base url makes it work cuz the end url for poster_path is looks like /lk24314r2f.jpg.  {`${base_url}${movie.poster_path}`} . Now movie pictures will show!
const base_url = "https://image.tmdb.org/t/p/original/";
const movie_url = "https://www.themoviedb.org/movie/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]); // our initial empty movie array
  const [trailerUrl, setTrailerUrl] = useState(""); // set state based on onClock on movie Poster
  const [toolTip, setToolTip] = useState("");

  // A snippet of code that runs based on a specific condition/variable, this is where we use useEffect
  useEffect(() => {
    // if [], run once when the row loads, pull info from TMDB and set state, and dont run again, if we would put [movies] it would only run/uppdate when movies changes
    async function fetchData() {
      const request = await axios.get(fetchUrl); // axios.get is baseURL: "https://api.themoviedb.org/3", + fetchUrl which is our /discover/tv?api_key=${API_KEY}&with_networks=213
      setMovies(request.data.results); // data is specific method from axios. What we get back from API is an ARRAY of movies
      // console.table(request.data.results); // The trending movie data lives in the api at .data.results
      // console.log(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]); // must add [fetchUrl] because useEffect is dependent on that variable(cuz info is pulled from outside the useEffect block and we have tell useEffect where it's from)

  // Straight from the DOCs.
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClickTip = (movie) => {
    if (toolTip) {
      setToolTip("");
    } else {
      setToolTip(movie);
    }
  };

  const handleClick = (movie) => {
    // if trailer is already open (because you clicked the picture) then close it with setting state to ("")
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // movieTrailer is someone elses module, and if we pass in a name it tris to find a youtube trailer for it
      movieTrailer(movie?.name || "")
        .then((url) => {
          // here we grab the youtube video url https://www.youtube.com/watch?v=6lIt07sBW4E , the url is 6lIt07sBW4E and with this code below we get all this part: ?v=6lIt07sBW4E
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      {/* this second div is so that we can scroll through our movie posters */}
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id} // adding key={movie.id} gives each picture a unique id - this way it re-renders only the what changes and in our case not the whole row with pictures!
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} // Everything gets a "row_poster" class, BUT if it is isLargeRow then(&&) we gonna give it additional class called "row_posterLarge" we do this for the styling of rows
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.poster_path // isLargeRow get the poster instead of thumbnail
            }`}
            alt={movie.name}
            onClick={() => {
              handleClickTip(movie);
              handleClick(movie);
            }}
          /> // poster_path is from the movie array/object where path to pictures are poster_path: "/4EYPN5mVIhKLfxGruy7Dy41dTVn.jpg". If no picture is found, then show movie name
        ))}
      </div>
      <div
        className="row-banner"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(
           "https://image.tmdb.org/t/p/original/${toolTip?.backdrop_path}"
         )`,
          backgroundPosition: "center center",
        }}
      >
        <div className="row-banner-content">
          <a className="row_banner_title" href={`${movie_url}${toolTip.id}`}>
            {toolTip?.title || toolTip?.name || toolTip?.original_name}
          </a>
          <p className="row_date">{toolTip.release_date}</p>
          <h1 className="row_description">{toolTip.overview}</h1>
        </div>
      </div>
      {/* When we got that trailerUrl, then(&&) show the youtube video!  */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
