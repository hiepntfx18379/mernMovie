import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Loading from "../common/loadPage/Loading";
import Footer from "../common/utilPage/Footer";
import Topbar from "../common/utilPage/menu/Topbar";
import AuthModal from "../common/utilPage/modal/AuthModal";
import userApi from "../../api/modules/user.api";
import favoriteApi from "../../api/modules/favorite.api";
import { setListFavorites, setUser } from "../../redux/user/userSlide";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selector";
import { useEffect } from "react";
import { setListLang } from "../../redux/app/appSlide";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  useEffect(() => {
    const authUser = async () => {
      const { response, err } = await userApi.getInfo();
      if (response) dispatch(setUser(response));
      if (err) dispatch(setUser(null));
    };

    authUser();
  }, [dispatch]);

  useEffect(() => {
    const getFRavorites = async () => {
      const { response, err } = await favoriteApi.getList();

      if (response) dispatch(setListFavorites(response));
      if (err) toast.error(err.message);
    };

    if (user) getFRavorites();
    else dispatch(setListFavorites([]));
  }, [user, dispatch]);

  useEffect(() => {
    const getListLang = async () => {
      const response = await fetch(
        "https://redfox-server-movie.onrender.com/api/auth/lang",
      );
      const listLang = await response.json();
      const listLangUsable = listLang.filter((m) =>
        ["Tiếng Việt", "English", "日本語", "한국어/조선말"].includes(m.name),
      );
      dispatch(setListLang(listLangUsable));
    };

    try {
      getListLang();
    } catch {}
  }, []);

  return (
    <>
      {/* Loading */}
      <Loading />
      {/* Loading */}

      {/* Modal */}
      <AuthModal />

      <Box display="flex" minHeight="100vh">
        {/* Header */}
        <Topbar />

        {/* main */}
        <Box component="main" flexGrow={1} overflow="hidden" minHeight="100vh">
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default MainLayout;
