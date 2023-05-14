import React from "react";
import HeroSlide from "../../components/main/slide/HeroSlide";
import tmdbConfigs from "../../api/configs/tmdb.config";
import { Box } from "@mui/material";
import uiConfigs from "../../config/ui.config";
import MediaSlide from "../../components/main/slide/media/MediaSlide";
import Container from "../../components/common/utilPage/Container";

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />

      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Container header="popular movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="top rated movies">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.movie}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>

        <Container header="popular series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.popular}
          />
        </Container>

        <Container header="top rated series">
          <MediaSlide
            mediaType={tmdbConfigs.mediaType.tv}
            mediaCategory={tmdbConfigs.mediaCategory.top_rated}
          />
        </Container>
      </Box>
    </>
  );
};

export default HomePage;
