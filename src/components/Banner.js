import React, { useState } from "react";
import axios from "./axios";
import requests from "./requestApi";

const movie_url = "https://www.themoviedb.org/movie/";

const Banner = () => {
  const [movie, setMovie] = useState([]); // set state for random movie to show in banner

  useState(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchKoreanPopular);
      // cool thing is we set the logic to set films random here :) Remember the Api gives back an array of movies, we wan to choose one randomly
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) // grab a number between 0(beginning of array) -1(is so we don't risk going over)
        ]
      );
      return request;
    }
    fetchData();
  }, []); // [] signifies useState to trigger once, when the banner loads

  // console.log(movie); // check if working

  // This is from stackoverflow. Takes a str(string), n(give string a number) which lets it to truncate the text after 500char (truncate means add just dots ....)
  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    // background image in header. The ?(called OPTIONAL CHAINING!! it's new) inside ${movie?.backdrop_path} is there to make sure it wont freakout if backdrop dont exist
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(
          "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner-contents">
        {/* title - this logic handles the edge cases if data is not precise from API if movie. 
        {movie?.title(use movie title if exist) ||(and or use movie name etc) movie?.name || movie?.original_name} */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        {/* div > 2 buttons - PLAY and MY LIST */}
        <div className="banner_buttons">
          {/* <button className="banner_button">Play</button> */}
          <a href={`${movie_url}${movie.id}`}>
            <button className="banner_button">More Info</button>
          </a>
        </div>

        {/* description - truncate after 500characters*/}
        <h1 className="banner_description">
          {truncate(movie?.overview, 350)}
          {/* {movie?.overview} */}
        </h1>
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
