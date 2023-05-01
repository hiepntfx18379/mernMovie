import { useDispatch, useSelector } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import { cloneElement, useState } from "react";
import menuConfigs from "../../../../config/menu.config";
import { themeBg } from "../../../../config/theme.config";
import { setThemeMode } from "../../../../redux/theme/themeSlide";
import Logo from "../../loadPage/Logo";
import { themeModeSelector, userSelector } from "../../../../redux/selector";
import { setModalStatus } from "../../../../redux/modal/modalSlide";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import Sidebar from "./Sidebar";

const ScrollAppbar = ({ children, window }) => {
  const { themeMode } = useSelector(themeModeSelector);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
    target: window ? window() : undefined,
  });

  return cloneElement(children, {
    sx: {
      color: "trigger"
        ? "text.primary"
        : themeMode === themeBg.dark
        ? "primary.contrastText"
        : "text.primary",
      backgroundColor: trigger
        ? "background.paper"
        : themeMode === themeBg.dark
        ? "transparent"
        : "background.paper",
    },
  });
};

const Topbar = () => {
  const { user } = useSelector(userSelector);
  const { themeMode } = useSelector(themeModeSelector);
  const [sidebarOpen, setSideBarOpen] = useState(false);
  const dispatch = useDispatch();

  const onSwitchMode = () => {
    const theme = themeMode === themeBg.dark ? themeBg.light : themeBg.dark;
    dispatch(setThemeMode(theme));
  };

  const clickToggleSidebar = () => setSideBarOpen(!sidebarOpen);
  return (
    <>
      <Sidebar open={sidebarOpen} toggleSidebar={clickToggleSidebar} />
      <ScrollAppbar>
        <AppBar elevation={0} sx={{ zIndex: 3000 }}>
          <Toolbar
            sx={{ alignItems: "center", justifyContent: "space-between" }}
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <IconButton
                color="inherit"
                sx={{ mr: 2, display: { md: "none" } }}
                onClick={clickToggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Box
                sx={{
                  display: { xs: "inline-block", md: "none" },
                }}
              >
                <Logo />
              </Box>
            </Stack>

            <Box flexGrow={1} display={{ xs: "none", md: "flex" }}>
              {/*  */}
              <Stack
                alignItems="center"
                justifyContent="space-between"
                direction={{ xs: "column", md: "row" }}
                sx={{ height: "max-content" }}
              >
                <Logo />

                <Box>
                  {menuConfigs.main.map((it, index) => (
                    <Button
                      key={index}
                      sx={{
                        color: "inherit",
                        fontSize: "1.2rem",
                        ml: 2,
                        ":hover": { backgroundColor: "primary.main" },
                      }}
                      component={Link}
                      to={it.path}
                    >
                      {it.display}
                    </Button>
                  ))}
                </Box>
              </Stack>

              {/*  */}
              <IconButton sx={{ color: "inherit" }} onClick={onSwitchMode}>
                {themeMode === themeBg.dark && <DarkModeOutlinedIcon />}
                {themeMode === themeBg.light && <WbSunnyOutlinedIcon />}
              </IconButton>
            </Box>

            {/* userMenu */}
            <Stack spacing={3} direction="row" alignItems="center">
              {!user && (
                <Button
                  variant="contained"
                  onClick={() => dispatch(setModalStatus(true))}
                >
                  Sign in
                </Button>
              )}
            </Stack>
            {user && <UserMenu />}
          </Toolbar>
        </AppBar>
      </ScrollAppbar>
    </>
  );
};

export default Topbar;
