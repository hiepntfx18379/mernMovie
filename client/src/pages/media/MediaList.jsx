import React, { useEffect, useMemo, useState } from "react";
import tmdbConfigs from "../../api/configs/tmdb.config";
import mediaApi from "../../api/modules/media.api";
import uiConfigs from "../../config/ui.config";
import usePrevious from "../../hooks/usePrevious.hook";
import HeroSlide from "../../components/main/slide/HeroSlide";
import MediaPage from "../../components/main/slide/loadMore/MediaPage";
import { setAppState } from "../../redux/app/appSlide";
import { setLoading } from "../../redux/loading/loadingSlide";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Box, Stack } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const MediaList = () => {
  const { mediaType } = useParams();
  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top_rated"];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [mediaType, dispatch]);

  useEffect(() => {
    const getMedias = async () => {
      if (currentPage === 1) dispatch(setLoading(true));
      setMediaLoading(true);

      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currentCategory],
        page: currentPage,
      });

      setMediaLoading(false);
      dispatch(setLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        if (currentPage !== 1)
          setMedias((m) => [...m, ...response.data.results]);
        else setMedias([...response.data.results]);
      }
    };

    getMedias();
  }, [mediaType, currentCategory, currentPage, mediaCategories, dispatch]);

  const onCategoryChange = (categoryIndex) => {
    if (currentCategory === categoryIndex) return;
    setMedias([]);
    setCurrentPage(1);
    setCurrentCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrentPage(currentPage + 1);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currentCategory]}
      />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack
          spacing={2}
          direction={{ xs: "column", md: "row" }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ marginTop: "4rem" }}
        >
          <Typography fontWeight="700" variant="h5">
            {mediaType === tmdbConfigs.mediaType.movie ? "Movies" : "TV Series"}
          </Typography>

          <Stack direction="row" spacing={2}>
            {category.map((cate, index) => (
              <Button
                key={index}
                size="large"
                variant={currentCategory === index ? "contained" : "text"}
                sx={{
                  color:
                    currentCategory === index
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(index)}
              >
                {cate}
              </Button>
            ))}
          </Stack>
        </Stack>

        <MediaPage medias={medias} mediaType={mediaType} />

        <LoadingButton
          sx={{ marginTop: 8 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
          onClick={onLoadMore}
        >
          Load more
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
