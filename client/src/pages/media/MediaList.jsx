import React, { useEffect, useMemo, useState } from "react";
import tmdbConfigs from "../../api/configs/tmdb.config";
import mediaApi from "../../api/modules/media.api";
import uiConfigs from "../../config/ui.config";
import HeroSlide from "../../components/main/slide/HeroSlide";
import MediaPage from "../../components/main/slide/loadMore/MediaPage";
import {
  getGenres,
  setAppState,
  setMovieGenresList,
} from "../../redux/app/appSlide";
import { setLoading } from "../../redux/loading/loadingSlide";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Box, Stack } from "@mui/system";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import PaginationPage from "../../components/main/pagination/Pagination";
import { appStateSelector } from "../../redux/selector";
import { useCallback } from "react";

const MediaList = () => {
  const { mediaType } = useParams();
  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [allPage, setAllPage] = useState(0);
  const [genres, setGenres] = useState("");
  const { genresList, movieGenresList } = useSelector(appStateSelector);

  const dispatch = useDispatch();
  const mediaCategories = useMemo(() => ["popular", "top_rated"], []);
  const category = ["popular", "top_rated"];

  const searchFollowGenres = useCallback(async () => {
    const list = await fetch(
      `http://localhost:5000/api/${mediaType}/followGenres/${genres}`,
    );
    const data = await list.json();
    dispatch(setMovieGenresList(data));
    setMedias(
      [...movieGenresList].splice(20 * (currentPage - 1), 20 * currentPage),
    );
  }, [mediaType, genres, dispatch, currentPage, movieGenresList]);

  const onCategoryChange = (categoryIndex) => {
    if (currentCategory === categoryIndex) return;
    setMedias([]);
    setCurrentPage(1);
    setCurrentCategory(categoryIndex);
  };

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
    setGenres("");
    setCurrentPage(1);
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
        setAllPage(response.data.total_pages);
        setMedias([...response.data.results]);
      }
    };

    if (genres !== "") searchFollowGenres();
    else getMedias();
  }, [
    mediaType,
    currentCategory,
    currentPage,
    mediaCategories,
    dispatch,
    searchFollowGenres,
    genres,
  ]);

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
            <Box>
              {/* find movie follow genre */}
              <FormControl sx={{ marginLeft: "10px" }}>
                <InputLabel id="demo-simple-select-label">Genres</InputLabel>
                <Select
                  sx={{ width: "120px" }}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={genres}
                  label="Genres"
                  onChange={(e) => setGenres(e.target.value)}
                >
                  {[...genresList].map((g) => {
                    return (
                      <MenuItem value={`${g.id}`} key={g.id}>
                        {`${g.name}`}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>

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
          sx={{ marginTop: 2 }}
          fullWidth
          color="primary"
          loading={mediaLoading}
        >
          {genres !== "" ? (
            <PaginationPage
              setPage={setCurrentPage}
              totalPage={Math.floor(movieGenresList.length / 20)}
            />
          ) : (
            <PaginationPage setPage={setCurrentPage} totalPage={allPage} />
          )}
        </LoadingButton>
      </Box>
    </>
  );
};

export default MediaList;
