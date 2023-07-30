import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({title, fetchUrl, isLargeRow}){
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");
    useEffect (() =>{
        // if [], run once when the row loads, and dont run again
        async function fetchData (){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            // use console.log(request) and go to object => data => results, you'll find the movie names
            return request;


        }
        fetchData();
    }, [fetchUrl])
    const opts = {
        height: "390",
        width: "99%",
        playerVars: {
          autoplay: 1,
        }
    }

    const handleClick = (movie) => {
        // console.table(movie?.title)
        if (trailerUrl) {
          setTrailerUrl('')
        } else {
          movieTrailer(movie?.title || "")
            .then(url => {
              const urlParams = new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get('v'));
            }).catch((error) => console.log(error));
        }
      }

    console.log(movies);
    const base_url = "https://image.tmdb.org/t/p/original/";
    

    return(
        <div className="row">
            <h2>{title}</h2>
            <div className="row_posters">
                {/* several row posters */}

                {movies.map(movie =>(
                    <img
                    key = {movie.id}
                    onClick={() => handleClick(movie)}
                    className = {`row_poster ${isLargeRow && "row_posterLarge"} `} src = {`${base_url}${isLargeRow ? movie.poster_path: movie.backdrop_path}`} alt = {movie.name}/>
                ))}

            </div> 
            {trailerUrl && <YouTube videoID = {trailerUrl} opts = {opts}  />}
            {/* container => posters */}
        </div>
    )
}

export default Row;