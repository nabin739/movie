import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

export const Register = () => {
  const registerValidatingSchema = yup.object({
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: registerValidatingSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="addform" onSubmit={formik.handleSubmit}>
      <h1>REGISTER</h1>
      <TextField
        id="outlined-basic"
        label="username"
        variant="outlined"
        value={formik.values.username}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.username && formik.errors.username}
        helperText={
          formik.touched.username && formik.errors.username
            ? formik.errors.username
            : null
        }
        name="username"
      />

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

      <Button value="outlined" type="submit">
        Confirm
      </Button>
    </form>
  );
};
