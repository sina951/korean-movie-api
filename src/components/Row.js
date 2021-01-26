import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";
import axios from "./axios"; // axios is the renamed component, instance (when you export as default you can name it whatever)

// console.log() is great but console.table() is sick for arrays and objects!
// RFCE or RAFCE
// Base url makes it work cuz the end url for poster_path is looks like /lk24314r2f.jpg.  {`${base_url}${movie.poster_path}`} . Now movie pictures will show!
// if trailer is already open (because you clicked the picture) then close it with setting state to ("")
// { toolTip && <div className="row-banner-content">  Here we set it do empty string on click, and if movie is available on click show the div and populate the data :)


const base_url = "https://image.tmdb.org/t/p/original/";
const movie_url = "https://www.themoviedb.org/movie/";

const Row = ({ title, fetchUrl, isLargeRow }) => {
  const [movies, setMovies] = useState([]); 
  const [trailerUrl, setTrailerUrl] = useState("");
  const [toolTip, setToolTip] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results); 
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
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
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        }).catch(
          (error) => console.log(error)
        );
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>
      
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id} 
            className={`row_poster ${isLargeRow && "row_posterLarge"}`} 
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.poster_path 
            }`}
            alt={movie.name}
            onClick={() => {
              handleClickTip(movie);
              handleClick(movie);
            }}
          />
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

      { toolTip && <div className="row-banner-content">
          <a className="row_banner_title" href={`${movie_url}${toolTip.id}`}>
            {toolTip?.title || toolTip?.name || toolTip?.original_name}
          </a>
          <p className="row_date">{toolTip.release_date}</p>
          <h1 className="row_description">{toolTip.overview}</h1>
        </div> }
      </div>
      
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
};

export default Row;
