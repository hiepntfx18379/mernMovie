import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { LoadingButton } from "@mui/lab";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/selector";
import CircularRate from "../../components/common/CircularRate";
import Container from "../../components/common/utilPage/Container";
import ImageHeader from "../../components/main/slide/header/ImageHeader";
import uiConfigs from "../../config/ui.config";
import tmdbConfigs from "../../api/configs/tmdb.config";
import mediaApi from "../../api/modules/media.api";
import favoriteApi from "../../api/modules/favorite.api";
import { useEffect, useRef, useState } from "react";
import { setLoading } from "../../redux/loading/loadingSlide";
import { setModalStatus } from "../../redux/modal/modalSlide";
import { removeFavorite, addFavorite } from "../../redux/user/userSlide";
import { toast } from "react-toastify";
import CaseSlide from "../../components/main/slide/CastSlide";
import favoriteUtils from "../../ulis/favorite.util";
import MediaVideosSlide from "../../components/main/slide/videos/MediaVideosSlide";
import BackdropSlide from "../../components/main/slide/backdrop/BackdropSlide";
import Recommendation from "../../components/main/slide/recommendation/Recommendation";
import MediaSlide from "../../components/main/slide/media/MediaSlide";

const MediaDetail = () => {
  const { mediaType, media_id } = useParams();
  const { user, listFavorites } = useSelector(userSelector);
  const [media, setMedia] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [onRequest, setOnRequest] = useState(false);
  const [genres, setGenres] = useState([]);
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  useEffect(() => {
    const getMedia = async () => {
      dispatch(setLoading(true));
      const { response, err } = await mediaApi.getDetail({
        mediaType,
        media_id,
      });

      dispatch(setLoading(false));

      if (response) {
        setMedia(response.data);
        setIsFavorite(response.data.isFavorite);
        setGenres(response.data.genres);
      }

      if (err) toast.error(err.message);
    };

    getMedia();
  }, [mediaType, media_id, dispatch]);

  const onFavoriteClick = async () => {
    if (!user) return dispatch(setModalStatus(true));
    if (onRequest) return;
    if (isFavorite) {
      onRemoveFavorite();
      return;
    }
    setOnRequest(true);

    const body = {
      mediaId: media_id,
      mediaType: mediaType,
      mediaTitle: media.title || media.name,
      mediaPoster: media.poster_path,
      mediaRate: media.vote_average,
    };

    const { response, err } = await favoriteApi.add(body);
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      dispatch(addFavorite(response));
      setIsFavorite(true);
      toast.success("Add favorite list");
    }
  };

  const onRemoveFavorite = async () => {
    if (onRequest) return;
    setOnRequest(true);

    const favorite = listFavorites.find(
      (f) => f.mediaId.toString() === media.id.toString(),
    );

    const { response, err } = await favoriteApi.remove({
      favId: favorite.id,
    });

    setOnRequest(false);
    if (err) toast.error(err.message);
    if (response) {
      dispatch(removeFavorite(favorite));
      setIsFavorite(false);
      toast.success("Removed");
    }
  };

  return media ? (
    <>
      <ImageHeader
        imgPath={tmdbConfigs.backdropPath(
          media.backdrop_path || media.poster_path,
        )}
      />

      <Box
        sx={{
          color: "primary.contrastText",
          ...uiConfigs.style.mainContent,
        }}
      >
        {/* media content */}
        <Box
          sx={{
            marginTop: { xs: "-10rem", md: "-15rem", lg: "-9rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
            }}
          >
            {/* Poster */}
            <Box
              sx={{
                width: { xs: "70%", sm: "50%", md: "40%" },
                margin: { xs: "0 auto 2rem", md: "0 2rem 0 0" },
              }}
            >
              <Box
                sx={{
                  paddingTop: "140%",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.backdropPath(
                      media.poster_path || media.backdrop_path,
                    ),
                  ),
                }}
              />
            </Box>

            {/* media info */}
            <Box
              sx={{
                width: { xs: "100%", md: "60%" },
                color: "text.primary",
              }}
            >
              <Stack spacing={5}>
                <Typography
                  variant="h4"
                  fontSize={{ xs: "2rem", md: "2rem", lg: "4rem" }}
                  fontWeight="700"
                  sx={{
                    ...uiConfigs.style.typoLines(1.5, "left"),
                  }}
                >
                  {`${media.title || media.name} ${
                    mediaType === tmdbConfigs.mediaType.movie
                      ? media.release_date.split("-")[0]
                      : media.first_air_date.split("-")[0]
                  }`}
                </Typography>

                {/* rate */}
                <Stack direction="row" spacing={1} alignItems="center">
                  <CircularRate value={media.vote_average} />
                  <Divider orientation="vertical" />

                  {genres.map((genre, index) => {
                    return (
                      <Chip
                        label={genre.name}
                        variant="filled"
                        color="primary"
                        key={index}
                      />
                    );
                  })}
                </Stack>

                {/* desc */}
                <Typography
                  variant="body1"
                  sx={{
                    ...uiConfigs.style.typoLines(5),
                  }}
                >
                  {media.overview}
                </Typography>

                {/* btn */}
                <Stack direction="row" spacing={1}>
                  <LoadingButton
                    variant="text"
                    sx={{
                      width: "max-content",
                      "& .MuiButton-startIcon": { marginRight: "0" },
                    }}
                    size="large"
                    startIcon={
                      favoriteUtils.check({
                        listFavorites,
                        mediaId: media.id,
                      }) ? (
                        <FavoriteIcon />
                      ) : isFavorite ? (
                        <FavoriteIcon />
                      ) : (
                        <FavoriteBorderOutlinedIcon />
                      )
                    }
                    loadingPosition="start"
                    loading={onRequest}
                    onClick={onFavoriteClick}
                  />

                  <Button
                    variant="contained"
                    sx={{
                      width: "max-content",
                    }}
                    size="large"
                    startIcon={<PlayArrowIcon />}
                    onClick={() => videoRef.current.scrollIntoView()}
                  >
                    Watch Now
                  </Button>
                </Stack>

                {/* cast */}
                <Container header="Cast">
                  <CaseSlide cast={media.credits.cast} />
                </Container>
              </Stack>
            </Box>
          </Box>
        </Box>
        {/* videos demo */}
        <div ref={videoRef} style={{ paddingTop: "2rem" }}>
          <Container header="Videos">
            <MediaVideosSlide videos={media.videos} />
          </Container>
        </div>

        {/* media backdrop  */}
        {media.images.backdrops.length > 0 && (
          <Container header="backdrop">
            <BackdropSlide backdrops={media.images.backdrops} />
          </Container>
        )}

        {/* review */}
        {/* <MediaReview
          reviews={media.review}
          mediaType={mediaType}
          media={media}
          user={user}
        /> */}

        {/* recommendation */}
        <Container header="You may also like">
          {media.recommend.length > 0 && (
            <Recommendation medias={media.recommend} mediaType={mediaType} />
          )}

          {media.recommend.length === 0 && (
            <MediaSlide
              mediaType={mediaType}
              mediaCategory={tmdbConfigs.mediaCategory.top_rated}
            />
          )}
        </Container>
      </Box>
    </>
  ) : (
    <h1 style={{ textAlign: "center", fontSize: "55px", marginTop: "5rem" }}>
      404 Not found film_id
    </h1>
  );
};

export default MediaDetail;
