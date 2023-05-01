import React, { useState } from "react";
import * as Yup from "yup";
import authApi from "../../../../api/modules/auth.api";
import { setModalStatus } from "../../../../redux/modal/modalSlide";
import { setUser } from "../../../../redux/user/userSlide";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const FormLogin = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isLoginReq, setIsLoginReq] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const loginForm = useFormik({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minium 8 chacracters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minium 8 chacracters")
        .required("password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsLoginReq(true);
      const { response, error } = await authApi.login(values);
      setIsLoginReq(false);

      if (response) {
        loginForm.resetForm();
        dispatch(setUser(response));
        dispatch(setModalStatus(false));
        toast.success("Login success");
      }

      if (error) setErrorMessage(error.message);
    },
  });
  return (
    <Box component="form" onSubmit={loginForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={loginForm.values.username}
          onChange={loginForm.handleChange}
          color="success"
          error={
            loginForm.touched.username &&
            loginForm.errors.username !== undefined
          }
          helperText={loginForm.touched.username && loginForm.errors.username}
        />

        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={loginForm.values.password}
          onChange={loginForm.handleChange}
          color="success"
          error={
            loginForm.touched.password &&
            loginForm.errors.password !== undefined
          }
          helperText={loginForm.touched.password && loginForm.errors.password}
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginReq}
      >
        sign in
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert security="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default FormLogin;
