import NavigationSwiper from "./NavigationSwiper";
import { SwiperSlide } from "swiper/react";
import MediaVideoItem from "./MediaVideoItem";

const MediaVideosSlide = ({ videos }) => {
  return (
    <NavigationSwiper>
      {videos.slice(3, 10).map((video, index) => (
        <SwiperSlide key={index}>
          <MediaVideoItem video={video} key={index} />
        </SwiperSlide>
      ))}
    </NavigationSwiper>
  );
};

export default MediaVideosSlide;
