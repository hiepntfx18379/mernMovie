import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const Container = ({ header, children }) => {
  return (
    <Box
      sx={{
        marginTop: "2rem",
        marginX: "auto",
        color: "text.primary",
      }}
    >
      <Stack spacing={4}>
        {header && (
          <Box
            sx={{
              position: "relative",
              paddingX: { xs: "20px", md: 0 },
              maxWidth: "1366px",
              marginX: "auto",
              width: "100%",
              "&::before": {
                content: '""',
                position: "absolute",
                left: { xs: "20px", md: 0 },
                top: "100%",
                width: "100px",
                backgroundColor: "primary.main",
              },
            }}
          >
            <Typography variant="h3" fontWeight="700">
              {header}
            </Typography>
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;
