import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { AutoPlay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Loading from "../../../components/common/loadPage/Loading";
import { routesGenaral } from "../../../routes/router";
import tmdbConfigs from "../../../api/configs/tmdb.config";
import uiConfigs from "../../../config/ui.config";
import Circularate from "../../common/CircularRate";
import { genreApi } from "../../../api/modules/genre.api";
import mediaApi from "../../../api/modules/media.api";
import { useTheme } from "@emotion/react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { setLoading } from "../../../redux/loading/loadingSlide";
import { Box } from "@mui/material";

const HeroSlide = ({ mediaType, mediaCategory }) => {
  console.log(mediaType, mediaCategory);
  const theme = useTheme();
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

      if (response) setMovie(response.results);
      if (err) toast.error(err.message);
      dispatch(setLoading(false));
    };

    const getGenres = async () => {
      dispatch(setLoading(true));
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        setGenres(response.genres);
        getMedias();
      }
      if (err) {
        toast.error(err.message);
        setLoading(false);
      }
    };

    getGenres();
  }, [mediaType, mediaCategory, dispatch]);

  return <Box>HeroSlide</Box>;
};

export default HeroSlide;
