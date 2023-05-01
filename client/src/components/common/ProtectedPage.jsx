import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setModalStatus } from "../../redux/modal/modalSlide";

const ProtectedPage = ({ children }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(setModalStatus(!user));
  }, [user, dispatch]);
  return user ? children : null;
};

export default ProtectedPage;
