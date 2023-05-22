import { LoadingButton } from "@mui/lab";
import Container from "../../../common/utilPage/Container";
import reviewApi from "../../../../api/modules/review.api";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/selector";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import TextAvatar from "./TextAvatar";
import ReviewItem from "./ReviewItem";

const MediaReview = ({ reviews, mediaType, media, user }) => {
  const [listReviews, setListReviews] = useState([]);
  const [filteredReviews, setFilterReview] = useState([]);
  const [page, setPage] = useState(1);
  const [onRequest, setOnRequest] = useState(false);
  const [content, setContent] = useState("");
  const [reviewCount, setReviewCount] = useState(0);
  const skip = 4;

  useEffect(() => {
    setListReviews([...reviews]);
    setFilterReview([...reviews]);
    setReviewCount(reviews.length);
  }, [reviews]);

  const onAddReview = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const body = {
      content,
      mediaId: media.id,
      mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
    };

    const { response, err } = await reviewApi.add(body);

    setOnRequest(false);
    if (err) toast.error(err.message);
    if (response) {
      toast.success("Post review success");

      setFilterReview([...filteredReviews, response]);
      setReviewCount(reviewCount + 1);
      setContent("");
    }
  };

  const onLoadMore = () => {
    setFilterReview([
      ...filteredReviews,
      ...[...listReviews].splice(page * skip, skip),
    ]);

    setPage(page + 1);
  };

  const onRemoved = (id) => {
    if (listReviews.findIndex((e) => e.id === id) !== -1) {
      const newListReviews = [...listReviews].filter((e) => e.id !== id);
      setListReviews(newListReviews);
      setFilterReview([...newListReviews].splice(0, page * skip));
    } else {
      setFilterReview([...filteredReviews].filter((e) => e.id !== id));
    }

    setReviewCount(reviewCount - 1);
    toast.success("Remove review success");
  };

  return (
    <>
      <Container header={`Reviews ${reviewCount}`}>
        <Stack spacing={4} marginBottom={2}>
          {filteredReviews.map((item) => (
            <Box key={item.id}>
              <ReviewItem review={item} onRemoved={onRemoved} />
              <Divider
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              />
            </Box>
          ))}

          {filteredReviews.length < listReviews.length && (
            <Button onClick={onLoadMore}>Load more</Button>
          )}
        </Stack>

        <Stack direction="row" spacing={2}>
          {user ? (
            <TextAvatar text={user.data.displayName} />
          ) : (
            <TextAvatar text="Viewer" />
          )}
          <Stack spacing={2} flexGrow={1}>
            <Typography variant="h6" fontWeight="700">
              {user ? user.data.displayName : "Viewer"}
            </Typography>

            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={4}
              placeholder="Write your review"
              variant="outlined"
            />
            <LoadingButton
              variant="contained"
              size="large"
              sx={{ width: "max-content" }}
              startIcon={<SendOutlinedIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onAddReview}
            >
              Post Review
            </LoadingButton>
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default MediaReview;
