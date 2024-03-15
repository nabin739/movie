import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

export const Addmovie = () => {
  const movieValidatingSchema = yup.object({
    name: yup.string().required(),
    poster: yup.string().required(),
    trailer: yup.string().required(),
    rating: yup.number().required(),
    summary: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      name: "",
      poster: "",
      trailer: "",
      rating: "",
      summary: "",
    },
    validationSchema: movieValidatingSchema,
    onSubmit: (values) => {
      // console.log(values);
      addmovie(values)
    },
  });
  const navigate = useNavigate();
  const addmovie = (values)=> {
    fetch("https://65f16e71034bdbecc762902e.mockapi.io/nabin",{
    method:"POST",
    body:JSON.stringify(values),
    headers:{"Content-type":"application/json"},
  }).then(()=> navigate("/portal/movie"));
  };

  return (
   
    <form className="addform" onSubmit={formik.handleSubmit}>
      <h1>Add movie</h1>
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
  );
};
