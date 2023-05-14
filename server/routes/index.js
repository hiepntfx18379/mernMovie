import authRoute from "./authRoute.js";
import mediaRoute from "./mediaRoute.js";
import personRoute from "./personRoute.js";
import reviewRoute from "./reviewRoute.js";
import userRoute from "./userRoute.js";

export default function routes(app) {
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/:mediaType", mediaRoute);
  app.use("/api/person", personRoute);
  app.use("/api/review", reviewRoute);
}
