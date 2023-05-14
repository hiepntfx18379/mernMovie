import React from "react";
import menuConfigs from "../../../../config/menu.config";
import Logo from "../../loadPage/Logo";
import uiConfigs from "../../../../config/ui.config";
import { themeBg } from "../../../../config/theme.config";
import { setThemeMode } from "../../../../redux/theme/themeSlide";
import { useDispatch, useSelector } from "react-redux";
import { themeModeSelector, userSelector } from "../../../../redux/selector";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import { Link } from "react-router-dom";

const Sidebar = ({ open, toggleSidebar }) => {
  const dispatch = useDispatch();

  const { user } = useSelector(userSelector);
  const { themeMode } = useSelector(themeModeSelector);

  const sidebarWidth = uiConfigs.size.sidebarWidth;
  const onSwitchMode = () => {
    const theme = themeMode === themeBg.dark ? themeBg.light : themeBg.dark;
    dispatch(setThemeMode(theme));
  };

  const drawer = (
    <>
      <Toolbar sx={{ paddingY: "20px", color: "text.primary" }}>
        <Stack width="100%" direction="row" justifyContent="center">
          <Logo />
        </Stack>
      </Toolbar>
      <List sx={{ paddingX: "30px" }}>
        <Typography variant="h6" marginBottom="20px">
          MENU
        </Typography>
        {menuConfigs.main.map((item, id) => (
          <ListItemButton
            key={id}
            sx={{
              borderRadius: "10px",
              marginY: 1,
            }}
            component={Link}
            to={item.path}
            onClick={() => toggleSidebar(false)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText
              disableTypography
              primary={
                <Typography textTransform="uppercase">
                  {item.display}{" "}
                </Typography>
              }
            />
          </ListItemButton>
        ))}

        {user && (
          <>
            <Typography variant="h6" marginBottom="20px">
              PERSONAL
            </Typography>
            {menuConfigs.user.map((item, id) => (
              <ListItemButton
                key={id}
                sx={{
                  borderRadius: "10px",
                  marginY: 1,
                }}
                component={Link}
                to={item.path}
                onClick={() => toggleSidebar(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}{" "}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
          </>
        )}

        <Typography variant="h6" marginBottom="20px">
          THEME
        </Typography>
        <ListItemButton>
          <ListItemIcon onClick={onSwitchMode}>
            {themeMode === themeBg.dark && <DarkModeOutlinedIcon />}
            {themeMode === themeBg.light && <WbSunnyOutlinedIcon />}
          </ListItemIcon>
          <ListItemText
            disableTypography
            primary={
              <Typography textTransform="uppercase">
                {themeMode === themeBg.dark ? "dark mode" : "light mode"}
              </Typography>
            }
          />
        </ListItemButton>
      </List>
    </>
  );
  return (
    <Drawer
      open={open}
      onClose={() => toggleSidebar(false)}
      sx={{
        "& .MuiDrawer-Paper": {
          boxSizing: "border-box",
          width: sidebarWidth,
          borderRight: "0px",
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
