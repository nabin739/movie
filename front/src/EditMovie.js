import React from 'react'
import { TextField, Button } from "@mui/material";
import  { useEffect, useState } from "react";
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { useFormik } from "formik";
import * as yup from "yup";


export default function EditMovie() {
    const{id} = useParams()
    const [movie,setMovie] = useState(null)
    const [show,setShow] = useState(false)
    

    useEffect(() => {

        fetch(`https://65f16e71034bdbecc762902e.mockapi.io/nabin/${id}`, {
          method: "GET",
        })
          .then((data) => data.json())
          .then((mv) => setMovie(mv))
          .then(() => setShow(true));
      }, []);
      console.log(movie)
  return (
    <div>
      {show ? <EditForm movie={movie} /> : "Loading......."}
    </div>
  )
}

function EditForm({movie}){
    // const navigate = useNavigate()
    const movieValidatingSchema = yup.object({
    name: yup.string().required(),
    poster: yup.string().required(),
    trailer: yup.string().required(),
    rating: yup.number().required(),
    summary: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: movie.name,
      poster: movie.poster,
      trailer: movie.trailer,
      rating: movie.rating,
      summary: movie.summary,
    },
    validationSchema: movieValidatingSchema,
    onSubmit: (updatedmovies) => {
      // console.log(values);
      EditMovie(updatedmovies)
    },
  });
  const navigate = useNavigate();
  const EditMovie = (updatedmovies)=> {
    fetch(`https://65f16e71034bdbecc762902e.mockapi.io/nabin/${movie.id}`,{
    method:"PUT",
    body:JSON.stringify(updatedmovies),
    headers:{"Content-type":"application/json"},
  }).then(()=> navigate("/portal/movie"));
  };

    return(
        <div>
           <form className="addform" onSubmit={formik.handleSubmit}>
      <h1>Edit Movie</h1>
      <TextField
        id="outlined-basic"
        label="name"
        variant="outlined"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && formik.errors.name}
        helperText={
          formik.touched.name && formik.errors.name ? formik.errors.name : null
        }
        name="name"
      />

      <TextField
        id="outlined-basic"
        label="poster"
        variant="outlined"
        value={formik.values.poster}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.poster && formik.errors.poster}
        helperText={
          formik.touched.poster && formik.errors.poster
            ? formik.errors.poster
            : null
        }
        name="poster"
      />

      <TextField
        id="outlined-basic"
        label="trailer"
        variant="outlined"
        value={formik.values.trailer}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.trailer && formik.errors.trailer}
        helperText={
          formik.touched.trailer && formik.errors.trailer
            ? formik.errors.trailer
            : null
        }
        name="trailer"
      />

      <TextField
        id="outlined-basic"
        label="rating"
        variant="outlined"
        value={formik.values.rating}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.rating && formik.errors.rating}
        helperText={
          formik.touched.rating && formik.errors.rating
            ? formik.errors.rating
            : null
        }
        name="rating"
      />

      <TextField
        id="outlined-basic"
        label="summary"
        variant="outlined"
        value={formik.values.summary}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.summary && formik.errors.summary}
        helperText={
          formik.touched.summary && formik.errors.summary
            ? formik.errors.summary
            : null
        }
        name="summary"
      />
      <Button value="outlined" type="submit">
        Confirm
      </Button>
    </form>

  
        </div>
    )
}
