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

const FormRegister = ({ switchAuthState }) => {
  const dispatch = useDispatch();
  const [isRegisterReq, setIsRegisterReq] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const registerForm = useFormik({
    initialValues: {
      username: "",
      displayName: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minium 8 chacracters")
        .required("username is required"),
      displayName: Yup.string()
        .min(8, "display name minium 8 chacracters")
        .required("display name is required"),
      password: Yup.string()
        .min(8, "password minium 8 chacracters")
        .required("password is required"),
      confirmPassword: Yup.string()
        .min(8, "confirm password minium 8 chacracters")
        .required("confirm password is required"),
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined);
      setIsRegisterReq(true);
      const { response, error } = await authApi.register(values);
      setIsRegisterReq(false);

      if (response) {
        registerForm.resetForm();
        dispatch(setUser(response));
        dispatch(setModalStatus(false));
        toast.success("Register success");
      }

      if (error) setErrorMessage(error);
    },
  });
  return (
    <Box component="form" onSubmit={registerForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="Username"
          name="username"
          fullWidth
          value={registerForm.values.username}
          onChange={registerForm.handleChange}
          color="success"
          error={
            registerForm.touched.username &&
            registerForm.errors.username !== undefined
          }
          helperText={
            registerForm.touched.username && registerForm.errors.username
          }
        />

        <TextField
          type="text"
          placeholder="Display name"
          name="displayName"
          fullWidth
          value={registerForm.values.displayName}
          onChange={registerForm.handleChange}
          color="success"
          error={
            registerForm.touched.displayName &&
            registerForm.errors.displayName !== undefined
          }
          helperText={
            registerForm.touched.displayName && registerForm.errors.displayName
          }
        />

        <TextField
          type="password"
          placeholder="Password"
          name="password"
          fullWidth
          value={registerForm.values.password}
          onChange={registerForm.handleChange}
          color="success"
          error={
            registerForm.touched.password &&
            registerForm.errors.password !== undefined
          }
          helperText={
            registerForm.touched.password && registerForm.errors.password
          }
        />

        <TextField
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          fullWidth
          value={registerForm.values.confirmPassword}
          onChange={registerForm.handleChange}
          color="success"
          error={
            registerForm.touched.confirmPassword &&
            registerForm.errors.confirmPassword !== undefined
          }
          helperText={
            registerForm.touched.confirmPassword &&
            registerForm.errors.confirmPassword
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isRegisterReq}
      >
        sign up
      </LoadingButton>

      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign in
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

export default FormRegister;
