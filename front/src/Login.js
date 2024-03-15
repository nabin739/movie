import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as yup from "yup";

export const Login = () => {
  const LoginValidatingSchema = yup.object({
    email: yup.string().required(),
    password: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidatingSchema,
    onSubmit: (values) => {
      console.log(values);
    }
  });

  return (
    <form className="addform" onSubmit={formik.handleSubmit}>
      <h1>Login </h1>
      <TextField
        id="outlined-basic"
        label="email"
        variant="outlined"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && formik.errors.email}
        helperText={
          formik.touched.email && formik.errors.email
            ? formik.errors.email
            : null
        }
        name="email"
      />

      <TextField
        id="outlined-basic"
        label="password"
        variant="outlined"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && formik.errors.password}
        helperText={
          formik.touched.password && formik.errors.password
            ? formik.errors.password
            : null
        }
        name="password"
      />

{/* <Button value="outlined" type='submit'>Confirm</Button> */}
<Button variant ="contained" type="submit">Submit</Button>
<h4>don't have account ? click here <Link to = "register">Login</Link></h4>
    </form>
  );
};
