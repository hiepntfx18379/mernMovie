import React from "react";
import Container from "./Container";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Logo from "../loadPage/Logo";
import menuConfigs from "../../../config/menu.config";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Container>
      <Paper
        square={true}
        sx={{
          backgroundImage: "unset",
          paddingX: "2rem",
          paddingY: "0.7rem",
        }}
      >
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
      </Paper>
    </Container>
  );
};

export default Footer;
