import tmdbConfigs from "../../../api/configs/tmdb.config";
import { routesGenaral } from "../../../routes/router";
import uiConfigs from "../../../config/ui.config";
import { Link } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import { Box, Typography } from "@mui/material";

const CaseSlide = ({ cast }) => {
  return (
    <Box
      sx={{
        "& .swiper-slide": {
          width: { xs: "50%", md: "25%", lg: "20.5%" },
          color: "primary.contrastText",
        },
      }}
    >
      <Swiper
        spaceBetween={10}
        slidesPerView={"auto"}
        grabCursor={true}
        style={{
          width: "100%",
          height: "max-content",
        }}
      >
        {cast.map((cast, index) => (
          <SwiperSlide key={index}>
            <Link to={routesGenaral.person(cast.id)}>
              <Box
                sx={{
                  paddingTop: "120%",
                  color: "text.primary",
                  ...uiConfigs.style.backgroundImage(
                    tmdbConfigs.posterPath(cast.profile_path),
                  ),
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    width: "100%",
                    height: "max-content",
                    bottom: 0,
                    padding: "10px",
                    backgroundColor: "rgba(0,0,0,0.6)",
                  }}
                >
                  <Typography sx={{ ...uiConfigs.style.typoLines(1, "left") }}>
                    {cast.name}
                  </Typography>
                </Box>
              </Box>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CaseSlide;
