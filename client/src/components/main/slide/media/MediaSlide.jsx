import { useEffect, useState } from "react";
import { SwiperSlide } from "swiper/react";
import mediaApi from "../../../../api/modules/media.api";
import { AutoSwiper } from "./AutoSwiper";
import { toast } from "react-toastify";
import Mediaitem from "./Mediaitem";

const MediaSlide = ({ mediaType, mediaCategory }) => {
  const [medias, setMedias] = useState([]);
  useEffect(() => {
    const getMedias = async () => {
      const { response, err } = await mediaApi.getList({
        mediaType,
        mediaCategory,
        page: 1,
      });

      if (response) setMedias(response.data.results);
      if (err) toast.error(err.message);
    };

    getMedias();
  }, [mediaType, mediaCategory, medias]);
  return (
    <AutoSwiper>
      {medias.map((media, index) => (
        <SwiperSlide key={index}>
          <Mediaitem media={media} mediaType={mediaType} key={index} />
        </SwiperSlide>
      ))}
    </AutoSwiper>
  );
};

export default MediaSlide;
