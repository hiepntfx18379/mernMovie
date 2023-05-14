import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
import MediaItem from "../../components/main/slide/media/Mediaitem";
import favoriteApi from "../../api/modules/favorite.api";
import { removeFavorite } from "../../redux/user/userSlide";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const FavoriteItem = ({ media, onRemoved }) => {
  const dispatch = useDispatch();
  const [onRequest, setOnRequest] = useState(false);

  const onRemove = async () => {
    if (onRequest) return;
    setOnRequest(true);
    const { response, err } = await favoriteApi.remove({ favId: media.id });
    setOnRequest(false);

    if (err) toast.error(err.message);
    if (response) {
      toast.success("Removed");
      dispatch(removeFavorite({ mediaId: media.mediaId }));
      onRemoved(media.id);
    }
  };

  return (
    <>
      <MediaItem media={media} mediaType={media.mediaType} />
      <LoadingButton
        fullWidth
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 60,
          width: "90%",
          left: "5%",
          marginTop: 2,
        }}
        startIcon={<DeleteIcon />}
        loadingPosition="start"
        loading={onRequest}
        onClick={onRemove}
      >
        Remove
      </LoadingButton>
    </>
  );
};

export default FavoriteItem;
