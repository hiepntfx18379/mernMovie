import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../../redux/loading/loadingSlide";
import favoriteApi from "../../api/modules/favorite.api";
import { toast } from "react-toastify";
import { Box, Button, Grid, Stack } from "@mui/material";
import Container from "../../components/common/utilPage/Container";
import FavoriteItem from "./FavoriteItem";

const FavoriteList = () => {
  const [medias, setMedias] = useState([]);
  const [fillteredMedias, setFillterMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const dispatch = useDispatch();
  const skip = 2;

  useEffect(() => {
    const getFavorites = async () => {
      dispatch(setLoading(true));
      const { response, err } = await favoriteApi.getList();
      dispatch(setLoading(false));

      if (err) toast.error(err.message);
      if (response) {
        setCount(response.data.length);
        setMedias([...response.data]);
        setFillterMedias([...response.data].splice(0, skip));
      }
    };

    getFavorites();
  }, []);

  const onLoadMore = () => {
    setFillterMedias([
      ...fillteredMedias,
      ...[...medias].splice(page * skip, skip),
    ]);
    setPage(page + 1);
  };

  const onRemoved = (id) => {
    const newMedias = [...medias].filter((e) => e.id !== id);
    setMedias(newMedias);
    setFillterMedias([...newMedias].splice(0, page * skip));
    setCount(count - 1);
  };

  return (
    <Box>
      <Container header={`Your favorites (${count})`}>
        <Grid container spacing={1} sx={{ marginRight: "-8px!important" }}>
          {fillteredMedias.map((media, index) => (
            <Grid
              item
              sx={{
                position: "relative",
                height: "650px",
              }}
              xs={6}
              sm={4}
              md={3}
              key={index}
            >
              <FavoriteItem media={media} onRemoved={onRemoved} />
            </Grid>
          ))}
        </Grid>
        {fillteredMedias.length < medias.length && (
          <Stack>
            <Button
              sx={{ marginBottom: "1rem", marginTop: "-2rem" }}
              onClick={onLoadMore}
            >
              Load more
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
};

export default FavoriteList;
