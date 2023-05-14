import { Box } from "@mui/material";

import React from "react";
import NavigationSwiper from "../videos/NavigationSwiper";
import { SwiperSlide } from "swiper/react";
import tmdbConfigs from "../../../../api/configs/tmdb.config";

const BackdropSlide = ({ backdrops }) => {
  return (
    <NavigationSwiper>
      {backdrops.slice(0, 20).map((item, index) => (
        <SwiperSlide key={index}>
          <Box
            sx={{
              paddingTop: "60%",
              backgroundPosition: "top",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${tmdbConfigs.backdropPath(
                item.file_path,
              )})`,
            }}
          ></Box>
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default BackdropSlide;
