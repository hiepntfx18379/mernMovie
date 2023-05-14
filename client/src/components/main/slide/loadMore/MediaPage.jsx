import Grid from "@mui/material/Unstable_Grid2";
import MediaItem from "../media/Mediaitem";

const MediaPage = ({ medias, mediaType }) => {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        marginRight: "-8px!important",
      }}
    >
      {medias.map((media, index) => (
        <Grid sx={{ height: "550px" }} item xs={6} sm={4} md={3} key={index}>
          <MediaItem media={media} mediaType={mediaType} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaPage;
