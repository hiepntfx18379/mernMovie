import React from "react";
import { Box, Stack, Typography, Divider } from "@mui/material";

const Container = ({ header, children }) => {
  return (
    <Box
      sx={{
        marginTop: "2rem",
        marginBottom: "-20px",

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
            <Typography
              variant="h3"
              fontSize="1.5rem"
              marginTop="35px"
              marginBottom="-15px"
              textTransform="uppercase"
              fontWeight="700"
            >
              {header}
            </Typography>
            <Divider
              sx={{
                bgcolor: "red",
                width: "12%",
                marginTop: "15px",
                borderBottomWidth: 6,
                borderRadius: "10px",
              }}
            />
          </Box>
        )}
        {children}
      </Stack>
    </Box>
  );
};

export default Container;
