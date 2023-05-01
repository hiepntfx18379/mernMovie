import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import menuConfigs from "../../../../config/menu.config";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../../redux/selector";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Typography,
} from "@mui/material";
import { setUser } from "../../../../redux/user/userSlide";

const UserMenu = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);
  const [anchorEl, setAnchorEl] = useState(false);

  const toggleMenu = (e) => setAnchorEl(e.currentTarget);

  return (
    <>
      {user && (
        <>
          <Typography
            variant="h6"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={toggleMenu}
          >
            {user.data.displayName}
          </Typography>

          <Menu
            open={anchorEl}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(false)}
            PaperProps={{ sx: { padding: 0 } }}
          >
            {menuConfigs.user.map((item, id) => (
              <ListItemButton
                component={Link}
                to={item.path}
                key={id}
                onClick={() => setAnchorEl(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={
                    <Typography textTransform="uppercase">
                      {item.display}
                    </Typography>
                  }
                />
              </ListItemButton>
            ))}
            <ListItemButton onClick={() => dispatch(setUser(null))}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText
                disableTypography
                primary={
                  <Typography textTransform="uppercase"> Log out</Typography>
                }
              />
            </ListItemButton>
          </Menu>
        </>
      )}
    </>
  );
};

export default UserMenu;
