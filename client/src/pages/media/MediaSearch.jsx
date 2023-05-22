import React, { useCallback, useEffect, useState } from "react";
import mediaApi from "../../api/modules/media.api";
import { LoadingButton } from "@mui/lab";
import MediaPage from "../../components/main/slide/loadMore/MediaPage";
import uiConfigs from "../../config/ui.config";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Toolbar,
} from "@mui/material";
import { useSelector } from "react-redux";
import { appStateSelector } from "../../redux/selector";

const mediaTypes = ["movie", "tv", "people"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMedidaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [listLang, setListLang] = useState([]);
  const [language, setLanguage] = useState("ja");
  const [year, setYear] = useState(2020);
  const { genresList } = useSelector(appStateSelector);
  const [genres, setGenres] = useState("");

  const yearArr = [];
  for (let i = 2015; i < 2024; i++) {
    yearArr.push(i);
  }

  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, err } = await mediaApi.search({
      mediaType,
      query,
      page,
      language,
      year,
    });

    setOnSearch(false);

    if (err) toast.error(err.message);
    if (response) {
      if (genres !== "") {
        response.data.results = [...response.data.results].filter((m) =>
          m.genre_ids.includes(genres),
        );
      }
      console.log(response.data.results);
      if (page > 1) setMedias((m) => [...m, ...response.data.results]);
      else setMedias([...response.data.results]);
    }
  }, [mediaType, query, page, language, year, genres]);

  useEffect(() => {
    const getListLang = async () => {
      const response = await fetch("http://localhost:5000/api/auth/lang");
      const listLang = await response.json();
      const listLangUsable = listLang.filter((m) =>
        ["Tiếng Việt", "English", "日本語", "한국어/조선말"].includes(m.name),
      );

      setListLang(listLangUsable);
    };

    getListLang();
  }, []);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page, language, year]);

  // reset and reload mediaType
  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectedCategory) =>
    setMedidaType(selectedCategory);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                key={index}
                size="large"
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color:
                    mediaType === item
                      ? "primary.contrastText"
                      : "text.primary",
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Year</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={year}
                label="Year"
                onChange={(e) => setYear(e.target.value)}
              >
                {yearArr.map((y) => (
                  <MenuItem value={y} key={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Language</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}
              >
                {listLang.map((y, index) => (
                  <MenuItem value={y.iso_639_1} key={index}>
                    {y.english_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Genres</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={genres}
                label="Genres"
                onChange={(e) => setGenres(e.target.value)}
              >
                {genresList.map((y) => (
                  <MenuItem value={y.id} key={y.id}>
                    {y.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <TextField
            color="success"
            placeholder="Enter word search"
            sx={{ width: "100%" }}
            autoFocus
            onChange={onQueryChange}
          />

          <MediaPage medias={medias} mediaType={mediaType} />
          {medias.length > 0 && (
            <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
              Load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;
