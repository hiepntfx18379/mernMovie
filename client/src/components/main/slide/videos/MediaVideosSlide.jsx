import NavigationSwiper from "./NavigationSwiper";
import { SwiperSlide } from "swiper/react";
import MediaVideoItem from "./MediaVideoItem";

const MediaVideosSlide = ({ videos }) => {
  return (
    <NavigationSwiper>
      {videos.length > 0 ? (
        videos.splice(0, 6).map((video, index) => (
          <SwiperSlide key={index}>
            <MediaVideoItem video={video} key={index} />
          </SwiperSlide>
        ))
      ) : (
        <h1 style={{ textAlign: "center", fontSize: "45px" }}>
          404 Video Not Found
        </h1>
      )}
    </NavigationSwiper>
  );
};

export default MediaVideosSlide;
