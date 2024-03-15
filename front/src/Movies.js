import Counter from "./Counter";
import { useState } from "react";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import ExpandLessSharpIcon from "@mui/icons-material/ExpandLessSharp";
import ExpandMoreSharpIcon from "@mui/icons-material/ExpandMoreSharp";
import InfoSharpIcon from "@mui/icons-material/InfoSharp";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
// import image from './sita-ramam-1.avif'
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


export default function Movies({ movieTake,getMovies }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
    function deleteMovie(id){
    fetch(`https://65f16e71034bdbecc762902e.mockapi.io/nabin/${id}`,{
    method:"DELETE"
    })
    .then(()=> getMovies())
    .then(()=> getMovies("this card gets deleted"))
  }
  return (
    <>
      <Card className="movie-container">
        <img className="movie-poster" src={movieTake.poster} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="movie-specs"
          >
            {movieTake.name}
            <IconButton onClick={() => setShow(!show)}>
              {show ? <ExpandLessSharpIcon /> : <ExpandMoreSharpIcon />}
            </IconButton>
            <IconButton
              color="primary"
              aria-label="Movie-info"
              onClick={() => navigate(`/portal/view/${movieTake.id}`)}
              // sx ={() => navigate(`/portal/edit/${movieTake.id}`)}
            >
              <InfoSharpIcon />
            </IconButton>
            <h6>⭐ 7.5</h6>
          </Typography>
          {show ? (
            <Typography variant="body2" color="text.secondary">
              {movieTake.summary}
            </Typography>
          ) : null}
        </CardContent>
        <CardActions className="action">
          <Counter />
          <IconButton
              color="primary"
              aria-label="Movie-info"
              onClick={() => navigate(`/portal/edit/${movieTake.id}`)}
            >
              <EditIcon  />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="Movie-info"
              onClick={() => {
                  deleteMovie(movieTake.id)
              }}
            >
              <DeleteIcon  />
            </IconButton>
           
        </CardActions>
      </Card>
    </>

    //
  );
}
