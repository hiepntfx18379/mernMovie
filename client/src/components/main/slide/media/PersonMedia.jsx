import React, { useEffect, useState } from "react";
import tmdbConfigs from "../../../../api/configs/tmdb.config";
import personApi from "../../../../api/modules/person.api";
import MediaItem from "./Mediaitem";
import { toast } from "react-toastify";
import { Button, Grid } from "@mui/material";

const PersonMedia = ({ personId }) => {
  const [medias, setMedias] = useState([]);
  const [filteredMedias, setFilteredMedias] = useState([]);
  const [page, setPage] = useState(1);
  const skip = 8;

  const getReleaseDate = (media) => {
    const date =
      media.media_type === tmdbConfigs.mediaType.movie
        ? new Date(media.release_date)
        : new Date(media.first_air_date);
    return date.getTime();
  };

  useEffect(() => {
    const getMedia = async () => {
      const { response, err } = await personApi.medias({ personId });

      if (err) toast.error(err.message);
      if (response) {
        console.log(response);
        const mediaSorted = response.data.cast.sort(
          (a, b) => getReleaseDate(b) - getReleaseDate(a),
        );
        setMedias([...mediaSorted]);
        setFilteredMedias([...mediaSorted].splice(0, skip));
      }
    };

    getMedia();
  }, [personId]);

  const onLoadMore = () => {
    setFilteredMedias([
      ...filteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  return (
    <>
      <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
        {filteredMedias.map((media, index) => (
          <Grid item sx={{ height: "530px" }} xs={6} sm={4} md={3} key={index}>
            <MediaItem media={media} mediaType={media.media_type} />
          </Grid>
        ))}
      </Grid>
      {filteredMedias.length < medias.length && (
        <Button onClick={onLoadMore}>Load more</Button>
      )}
    </>
  );
};

export default PersonMedia;
