import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userSlide } from "./user/userSlide";
import { themeModeSlide } from "./theme/themeSlide";
import { appStateSlide } from "./app/appSlide";
import { modalStateSlide } from "./modal/modalSlide";
import { loadingSlide } from "./loading/loadingSlide";

// chinh no
const store = configureStore({
  reducer: {
    user: userSlide.reducer,
    themeMode: themeModeSlide.reducer,
    appState: appStateSlide.reducer,
    modal: modalStateSlide.reducer,
    loadingStatus: loadingSlide.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({ serializableCheck: false });
  },
});

export default store;
