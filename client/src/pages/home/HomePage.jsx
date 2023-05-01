import React from "react";
import HeroSlide from "../../components/main/slide/HeroSlide";
import tmdbConfigs from "../../api/configs/tmdb.config";

const HomePage = () => {
  return (
    <>
      <HeroSlide
        mediaType={tmdbConfigs.mediaType.movie}
        mediaCategory={tmdbConfigs.mediaCategory.popular}
      />
    </>
  );
};

export default HomePage;
