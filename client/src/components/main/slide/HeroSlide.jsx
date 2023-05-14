import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { routesGenaral } from "../../../routes/router";
import tmdbConfigs from "../../../api/configs/tmdb.config";
import uiConfigs from "../../../config/ui.config";
import CirculaRate from "../../common/CircularRate";
import { genreApi } from "../../../api/modules/genre.api";
import mediaApi from "../../../api/modules/media.api";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setLoading } from "../../../redux/loading/loadingSlide";
import { Link } from "react-router-dom";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  const dispatch = useDispatch();
  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMovie(response.data.results);
      if (err) toast.error(err.message);
      dispatch(setLoading(false));
    };

    const getGenres = async () => {
      dispatch(setLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });
      if (response) {
        setGenres(response.data.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return (
    <Box
      sx={{
        position: "sticky",
        top: "60px",
        color: "priamry.contrastText",
      }}
    >
      <Swiper
        grabCursor={true}
        loop={true}
        modules={[Autoplay]}
        style={{
          width: "100%",
          height: "max-content",
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {movie.map((mov, index) => {
          return (
            <SwiperSlide key={index}>
              <Box
                sx={{
                  paddingTop: {
                    xs: "130%",
                    sm: "80%",
                    md: "60%",
                    lg: "45%",
                  },
                  backgroundPosition: "top",
                  backgroundSize: "contain",
                  backgroundRepeat: "round",
                  backgroundPositionX: "inherit",
                  backgroundImage: `url(${tmdbConfigs.backdropPath(
                    mov.backdrop_path || mov.poster_path,
                  )})`,
                }}
              />
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  paddingX: { sm: "10px", ms: "5rem", lg: "10rem" },
                }}
              >
                <Box
                  sx={{
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    paddingX: "30px",
                    color: "text.primary",
                    width: { sm: "unset", md: "30%", lg: "40%" },
                  }}
                >
                  <Stack spacing={4} direction="column">
                    {/* Title */}
                    <Typography
                      variant="h4"
                      fontSize={{ xs: "2rem", md: "2rem", lg: "2rem" }}
                      fontWeight="700"
                      sx={{
                        ...uiConfigs.style.typoLines(1),
                      }}
                    >
                      {mov.title || mov.name}
                    </Typography>

                    <Stack direction="row" spacing={1} alignItems="center">
                      {/* rating */}
                      <CirculaRate value={mov.vote_average} />

                      {/* genres */}
                      <Divider orientation="vertical" />
                      {[...mov.genre_ids]
                        .splice(0, 2)
                        .map((genresId, index) => (
                          <Chip
                            sx={{
                              marginTop: "10px",
                            }}
                            variant="filled"
                            color="primary"
                            key={index}
                            label={
                              genres.find((e) => e.id === genresId) &&
                              genres.find((e) => e.id === genresId).name
                            }
                          />
                        ))}
                    </Stack>

                    {/* overview - description*/}
                    <Typography
                      variant="body1"
                      sx={{
                        ...uiConfigs.style.typoLines(0.5),
                      }}
                    >
                      {mov.overview}
                    </Typography>

                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<PlayArrowIcon />}
                      component={Link}
                      to={routesGenaral.mediaDetail(mediaType, mov.id)}
                      sx={{ width: "max-content" }}
                    >
                      Watch now
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};

export default HeroSlide;
