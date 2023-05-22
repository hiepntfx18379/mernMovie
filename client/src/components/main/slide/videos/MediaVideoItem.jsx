import { useEffect, useRef } from "react";
import tmdbConfigs from "../../../../api/configs/tmdb.config";
import { Box } from "@mui/material";

const MediaVideoItem = ({ video }) => {
  const iframRef = useRef();
  useEffect(() => {
    const height = (iframRef.current.offsetWidth * 9) / 16 + "px";

    iframRef.current.setAttribute("height", height);
  }, []);

  return (
    <Box
      sx={{
        height: "max-content",
      }}
    >
      <iframe
        key={video.key}
        src={`${tmdbConfigs.youtubePath(video.key)}?autoplay=1&mute=1`}
        ref={iframRef}
        width="100%"
        title={video.id}
        style={{ border: 0 }}
      ></iframe>
    </Box>
  );
};

export default MediaVideoItem;
