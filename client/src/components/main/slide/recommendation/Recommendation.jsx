import Mediaitem from "../media/Mediaitem";
import { AutoSwiper } from "../media/AutoSwiper";
import React from "react";
import { SwiperSlide } from "swiper/react";

const Recommendation = ({ medias, mediaType }) => {
  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <Mediaitem media={media} mediaType={mediaType} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default Recommendation;
