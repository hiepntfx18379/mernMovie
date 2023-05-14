import { Typography, useTheme } from "@mui/material";
import React from "react";

const Logo = () => {
  const theme = useTheme();

  return (
    <Typography fontWeight="700" fontSize="2.5rem">
      Red<span style={{ color: theme.palette.primary.main }}>Fox</span>
    </Typography>
  );
};

export default Logo;
