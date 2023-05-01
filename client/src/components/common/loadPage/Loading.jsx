import { useEffect, useState } from "react";
import { loadingSelector } from "../../../redux/selector";
import { useSelector } from "react-redux";
import { Box, LinearProgress, Paper, Toolbar } from "@mui/material";
import Logo from "./Logo";

const Loading = () => {
  const { loadingStatus } = useSelector(loadingSelector);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (loadingStatus) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, [loadingStatus]);

  return (
    <Paper
      sx={{
        opacity: isLoading ? 1 : 0,
        pointerEvents: "none",
        transition: "all .3s ease",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 999,
      }}
    >
      <Toolbar />
      <LinearProgress />
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Logo />
      </Box>
    </Paper>
  );
};

export default Loading;
