import { LoadingButton } from "@mui/lab";
import * as Yup from "yup";
import Container from "../../components/common/utilPage/Container";
import uiConfigs from "../../config/ui.config";
import userApi from "../../api/modules/user.api";
import { setUser } from "../../redux/user/userSlide";
import { setModalStatus } from "../../redux/modal/modalSlide";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFomik, useFormik } from "formik";
import { toast } from "react-toastify";
import { Box, Stack, TextField } from "@mui/material";

const UpdatePassword = () => {
  const [onRequest, setOnRequest] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      newPassword: Yup.string()
        .min(8, " new password minimum 8 characters")
        .required("new password is required"),
      confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "confirm passwrord not match")
        .min(8, " confirm password minimum 8 characters"),
    }),
    onSubmit: async (value) => onUpdate(value),
  });

  const onUpdate = async (value) => {
    console.log(value);
    if (onRequest) return;
    setOnRequest(true);

    const { response, err } = await userApi.passwordUpdate(value);
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      form.resetForm();
      navigate("/");
      dispatch(setUser(null));
      dispatch(setModalStatus(true));
      toast.success("Update password success! Please re-login");
    }
  };

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="update password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              placeholder="Password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.password && form.errors.password !== undefined
              }
              helperText={form.touched.password && form.errors.password}
            />

            <TextField
              type="password"
              placeholder="New Password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.newPassword &&
                form.errors.newPassword !== undefined
              }
              helperText={form.touched.newPassword && form.errors.newPassword}
            />

            <TextField
              type="password"
              placeholder=" Confirm New Password"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword !== undefined
              }
              helperText={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword
              }
            />

            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              Update Password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default UpdatePassword;
