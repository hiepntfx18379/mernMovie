import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import reviewApi from "../../api/modules/review.api";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../../redux/user/userSlide";
import { Box, Stack, Typography } from "@mui/material";
import { routesGenaral } from "../../routes/router";
import { Link } from "react-router-dom";
import uiConfigs from "../../config/ui.config";
import tmdbConfigs from "../../api/configs/tmdb.config";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";

const ReviewItem = ({ review, onRemoved }) => {
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await reviewApi.remove({ reviewId: review.id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Removed");
      onRemoved(review.id);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        padding: 1,
        opacity: onRequest ? 0.6 : 1,
        "&:hover": { backgroundColor: "background.paper" },
      }}
    >
      <Box sx={{ width: { xs: 0, md: "10%" } }}>
        <Link
          to={routesGenaral.mediaDetail(review.mediaType, review.mediaId)}
          style={{ color: "unset", textDecoration: "none" }}
        >
          <Box
            sx={{
              paddingTop: "160%",
              ...uiConfigs.style.backgroundImage(
                tmdbConfigs.posterPath(review.mediaPoster),
              ),
            }}
          />
        </Link>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", md: "80%" },
          padding: { xs: 0, md: "0 2rem" },
        }}
      >
        <Stack spacing={1}>
          <Link
            to={routesGenaral.mediaDetail(review.mediaType, review.mediaId)}
            style={{ color: "unset", textDecoration: "none" }}
          >
            <Typography
              variant="h6"
              sx={{ ...uiConfigs.style.typoLines(1, "left") }}
            >
              {review.mediaTitle}
            </Typography>
          </Link>
          <Typography variant="caption">
            {dayjs(review.createAt).format("DD-MM-YYYY HH:mm:ss")}
          </Typography>
          <Typography>{review.content}</Typography>
        </Stack>
      </Box>

      <LoadingButton
        variant="contained"
        sx={{
          position: { xs: "relative", md: "absolute" },
          right: { xs: 0, md: "10px" },
          marginTop: { xs: 2, md: 0 },
          width: "max-content",
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        Remove
      </LoadingButton>
    </Box>
  );
};

export default ReviewItem;
