import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import tmdbConfigs from "../../../../api/configs/tmdb.config";
import uiConfigs from "../../../../config/ui.config";
import { routesGenaral } from "../../../../routes/router";
import favoriteUtils from "../../../../ulis/favorite.util";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/selector";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularRate from "../../../common/CircularRate";
import MediaVideoItem from "../videos/MediaVideoItem";
import { genreApi } from "../../../../api/modules/genre.api";

const Mediaitem = ({ media, mediaType }) => {
  const { listFavorites } = useSelector(userSelector);
  const [title, setTitle] = useState("");
  const [posterPath, setPosterPath] = useState("");
  const [releaseDate, setReleaseDate] = useState(null);
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setTitle(media.title || media.name || media.mediaTitle);

    setPosterPath(
      tmdbConfigs.posterPath(
        media.poster_path ||
          media.backdrop_path ||
          media.mediaPoster ||
          media.profile_path,
      ),
    );

    if (mediaType === tmdbConfigs.mediaType.movie) {
      setReleaseDate(media.release_date && media.release_date.split("-")[0]);
    } else {
      setReleaseDate(
        media.first_air_date && media.first_air_date.split("-")[0],
      );
    }

    setRate(media.vote_average || media.mediaRate);
  }, [media, mediaType]);

  return (
    <div>
      <Link
        to={
          mediaType !== "people"
            ? routesGenaral.mediaDetail(mediaType, media.mediaId || media.id)
            : routesGenaral.person(media.id)
        }
      >
        <Box
          sx={{
            ...uiConfigs.style.backgroundImage(posterPath),
            paddingTop: "160%",
            marginBottom: "180px",
            "&:hover .media-info": { opacity: 1, bottom: 0 },
            "&:hover .media-back-drop, &:hover .media-play-btn": {
              opacity: 1,
            },
            color: "primary.contrastText",
          }}
        >
          {/* movie or tv item */}
          {mediaType !== "people" && (
            <>
              {favoriteUtils.check({
                listFavorites,
                mediaId: media.id,
              }) && (
                <FavoriteIcon
                  color="primary"
                  sx={{
                    position: "absolute",
                    top: 2,
                    right: 2,
                    frontSize: "24px",
                  }}
                />
              )}

              <Box
                className="media-back-drop"
                sx={{
                  opacity: { xs: 1, md: 0, lg: 0 },
                  transition: "all 0.5s ease",
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  bottom: 0,
                  backgroundImage:
                    "linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
                }}
              />

              {/* button play video of movie */}
              <Button
                className="media-play-btn"
                variant="contained"
                startIcon={<PlayArrowIcon />}
                sx={{
                  display: { xs: "none", md: "flex" },
                  opacity: 0,
                  transition: "all 0.3s ease",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  borderRadius: "10px",
                  transform: "translate(-50%, -50%)",
                  "& .MuiButton-startIcon": { marginRight: "-4px" },
                }}
              />

              <Box
                className="media-info"
                sx={{
                  transition: "all 0.5s ease",
                  opacity: { xs: 1, md: 0 },
                  position: "absolute",
                  bottom: { xs: 0, md: "-20px" },
                  width: "100%",
                  hright: "max-content",
                  boxSizing: "border-box",
                  padding: { xs: "10px", md: "2rem , 1rem" },
                }}
              >
                <Stack spacing={{ xs: 1, md: 2 }}>
                  {rate && <CircularRate value={rate} />}
                  <Typography>{releaseDate}</Typography>

                  {/* <Stack spacing={2} direction="row" alignItems="center">
                    {[...media.genre_ids]
                      .splice(0, 1)
                      .map((genresId, index) => (
                        <Chip
                          sx={{
                            marginTop: "10px",
                          }}
                          width="20%"
                          variant="filled"
                          color="primary"
                          key={index}
                          label={
                            genres.find((e) => e.id === genresId) &&
                            genres.find((e) => e.id === genresId).name
                          }
                        />
                      ))}
                  </Stack> */}

                  <Typography
                    variant="body1"
                    fontWeight="700"
                    sx={{
                      fontSize: "1rem",
                      ...uiConfigs.style.typoLines(1),
                    }}
                  >
                    {title}
                  </Typography>
                </Stack>
              </Box>
            </>
          )}
          {/* movie or tv item */}

          {/* people */}
          {mediaType === "people" && (
            <Box
              sx={{
                position: "absolute",
                width: "100%",
                height: "max-content",
                bottom: 0,
                padding: "10px",
                backgroundColor: "rgba(0,0,0,0.6)",
              }}
            >
              <Typography>{media.name}</Typography>
            </Box>
          )}
        </Box>
      </Link>
    </div>
  );
};

export default Mediaitem;
