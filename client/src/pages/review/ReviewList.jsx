import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/loading/loadingSlide";
import { toast } from "react-toastify";
import reviewApi from "../../api/modules/review.api";
import { Box, Button, Divider, Grid, Stack } from "@mui/material";
import Container from "../../components/common/utilPage/Container";
import ReviewItem from "./ReviewItem";
import uiConfigs from "../../config/ui.config";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [fillteredReviews, setFillterReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const skip = 2;

  useEffect(() => {
    const getReviews = async () => {
      dispatch(setLoading(true));
      const { response, err } = await reviewApi.getList();
      dispatch(setLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.data.length);
        setReviews([...response.data]);
        setFillterReviews([...response.data].splice(0, skip));
      }
    };

    getReviews();
  }, []);

  const onLoadMore = () => {
    setFillterReviews([
      ...fillteredReviews,
      ...[...reviews].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newReviews = [...reviews].filter((e) => e.id !== id);
    setReviews(newReviews);
    setFillterReviews([...newReviews].splice(0, page * skip));
    setCount(count - 1);
  };
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header={`Your review (${count})`}>
        <Stack spacing={2}>
          {fillteredReviews.map((item) => {
            return (
              <Box key={item.id}>
                <ReviewItem review={item} onRemoved={onRemoved} />
                <Divider
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                />
              </Box>
            );
          })}
          {fillteredReviews.length < reviews.length && (
            <Button onClick={onLoadMore}>Load more</Button>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default ReviewList;
