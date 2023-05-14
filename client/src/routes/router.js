import HomePage from "../pages/home/HomePage";
import PersonDetail from "../pages/user/PersonDetail";
import MediaSearch from "../pages/media/MediaSearch";
import MediaList from "../pages/media/MediaList";
import MediaDetail from "../pages/media/MediaDetail";
import ProtectedPage from "../components/common/ProtectedPage";
import PasswordUpdate from "../pages/user/UpdatePassword";
import FavoriteList from "../pages/favorite/FavoriteList";
import ReviewList from "../pages/review/ReviewList";

// setip router v6
export const routesGenaral = {
  home: "/",
  mediaList: (type) => `/${type}`,
  mediaDetail: (type, id) => `/${type}/getDetail/${id}`,
  mediaSearch: "/search",
  person: (id) => `/person/id/${id}`,
  favoriteList: "/favorites",
  reviewList: "/reviews",
  passwordUpdate: "password-update",
};

// ref to path menu.config.js
const routes = [
  { index: true, element: <HomePage />, state: "home" },
  {
    path: "/person/id/:personId",
    element: <PersonDetail />,
    state: "person.detail",
  },
  { path: "/search", element: <MediaSearch />, state: "search" },
  {
    path: "/password-update",
    element: (
      <ProtectedPage>
        <PasswordUpdate />
      </ProtectedPage>
    ),
    state: "password.update",
  },
  {
    path: "/favorites",
    element: (
      <ProtectedPage>
        <FavoriteList />
      </ProtectedPage>
    ),
    state: "favorites",
  },
  {
    path: "/reviews",
    element: (
      <ProtectedPage>
        <ReviewList />
      </ProtectedPage>
    ),
    state: "reviews",
  },
  {
    path: "/:mediaType",
    element: <MediaList />,
  },
  {
    path: "/:mediaType/getDetail/:media_id",
    element: <MediaDetail />,
  },
];

export default routes;
