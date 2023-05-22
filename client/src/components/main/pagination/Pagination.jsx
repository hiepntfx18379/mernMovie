import { Box, Pagination } from "@mui/material";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: "fixed",
//     bottom: 0,
//     zIndex: 200,
//     padding: "10px 80px",
//     color: "white",
//     width: "100%",
//   },
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "white",
//   },
// }));

const PaginationPage = ({ setPage, totalPage }) => {
  //   const classes = useStyles();
  const handleChange = (page) => {
    setPage(page);
    if (page !== 1) window.scrollTo(0, 620);
  };

  return (
    <Box>
      <Box>
        <Pagination
          onChange={(e) => handleChange(e.target.textContent)}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
          variant="outlined"
          count={totalPage}
        />
      </Box>
    </Box>
  );
};

export default PaginationPage;
