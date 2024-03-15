import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import { Button } from "@mui/material";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    fetch(`https://65f16e71034bdbecc762902e.mockapi.io/nabin/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((mv) => setMovie(mv));
  }, []);
  console.log(movie);
  const ratingStyles ={
    color:movie.rating>=8.5?"green":"red",
  
  }

  return (
    <div>
      <iframe
        width="100%"
        height="492px"
        src={movie.trailer}
        title={movie.name}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <div className="movie-detail-container">
      <div className="movie-spec">
        <h3 className="movie-name">{movie.name}</h3>
        </div>
        <h3 style ={ratingStyles} className="movie-rating">{movie.rating}</h3>

        
      </div>
      <p className="movie-summary">{movie.summary}</p>
    
    {/* <Button> {< ArrowBackIosIcon/>} </Button> */}
    </div>
  );
}
