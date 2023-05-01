import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalStatus } from "../../../../redux/modal/modalSlide";
import { modalSelector } from "../../../../redux/selector";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Logo from "../../loadPage/Logo";
import FormLogin from "./FormLogin";
import FormRegister from "./FormRegister";

const actionUser = {
  login: "login",
  register: "register",
};

const AuthModal = () => {
  const modalStatus = useSelector(modalSelector);
  const dispatch = useDispatch();
  const [action, setAction] = useState(actionUser.login);

  useEffect(() => {
    if (modalStatus) setAction(actionUser.login);
  }, [modalStatus]);

  const handleClose = () => dispatch(setModalStatus(false));

  const switchAuthState = (state) => setAction(state);

  return (
    <Modal open={modalStatus} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "10%",
          transform: "translate(50%,-50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: " none",
        }}
      >
        <Box
          sx={{
            padding: 4,
            boxShadow: 24,
            backgroundColor: "background.paper",
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              marginBottom: "2rem",
            }}
          >
            <Logo />
          </Box>
          {action === actionUser.login && (
            <FormLogin
              switchAuthState={() => switchAuthState(actionUser.register)}
            />
          )}

          {action === actionUser.register && (
            <FormRegister
              switchAuthState={() => switchAuthState(actionUser.login)}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
