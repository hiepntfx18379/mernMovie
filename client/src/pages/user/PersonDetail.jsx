import React, { useEffect, useState } from "react";
import PersonMedia from "../../components/main/slide/media/PersonMedia";
import tmdbConfigs from "../../api/configs/tmdb.config";
import Container from "../../components/common/utilPage/Container";
import personApi from "../../api/modules/person.api";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { setLoading } from "../../redux/loading/loadingSlide";
import { useDispatch } from "react-redux";
import { Box, Stack, Toolbar, Typography } from "@mui/material";
import uiConfigs from "../../config/ui.config";

const PersonDetail = () => {
  const { personId } = useParams();
  const [person, setPerson] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPerson = async () => {
      dispatch(setLoading(true));
      const { response, err } = await personApi.detail({ personId });
      dispatch(setLoading(false));
      if (err) toast.error(err.message);
      if (response) setPerson(response);
    };

    getPerson();
  }, [personId]);

  return (
    <div>
      <Toolbar />
      {person && (
        <>
          <Box sx={{ ...uiConfigs.style.mainContent }}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box sx={{ width: { xs: "50%", md: "20%" } }}>
                <Box
                  sx={{
                    paddingTop: "160%",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundColor: "darkgrey",
                    backgroundImage: `url(${tmdbConfigs.posterPath(
                      person.data.profile_path,
                    )})`,
                  }}
                />
              </Box>

              <Box
                sx={{
                  width: { xs: "100%", md: "80%" },
                  padding: { xs: "1rem 0", md: "1rem 2rem" },
                }}
              >
                <Stack spacing={2}>
                  <Typography variant="h5" fontWeight="700">
                    {`${person.data.name} (${
                      person.data.birthday.split("-")[0]
                    }`}
                    {person.data.deadthday &&
                      `- ${person.data.deathday.split("-")[0]}`}
                    {")"}
                  </Typography>

                  <Typography sx={{ ...uiConfigs.style.typoLines(10) }}>
                    {person.data.biography}
                  </Typography>
                </Stack>
              </Box>
            </Box>

            <Container header="medias">
              <PersonMedia personId={personId} />
            </Container>
          </Box>
        </>
      )}
    </div>
  );
};

export default PersonDetail;
