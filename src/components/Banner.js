import React, { useState } from "react";
import axios from "./axios";
import requests from "./requestApi";

const movie_url = "https://www.themoviedb.org/movie/";
// set state for random movie to show in banner
// cool thing is we set the logic to set films random here :) Remember the Api gives back an array of movies, we wan to choose one randomly
// Math.floor(Math.random() * request.data.results.length - 1) // grab a number between 0(beginning of array) -1(is so we don't risk going over)
// [] signifies useState to trigger once, when the banner loads
// truncate: This is from stackoverflow. Takes a str(string), n(give string a number) which lets it to truncate the text after 500char (truncate means add just dots ....)
// console.log(movie); // check if working
// background image in header. The ?(called OPTIONAL CHAINING!! it's new) inside ${movie?.backdrop_path} is there to make sure it wont freakout if backdrop dont exist
const Banner = () => {
  const [movie, setMovie] = useState([]);

  useState(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchKoreanPopular);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
      return request;
    }
    fetchData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
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
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        
        <div className="banner_buttons">
          <a href={`${movie_url}${movie.id}`}>
            <button className="banner_button">More Info</button>
          </a>
        </div>

        <h1 className="banner_description">
          {truncate(movie?.overview, 350)}
        </h1>
        
      </div>
      <div className="banner-fadeBottom" />
    </header>
  );
};

export default Banner;
