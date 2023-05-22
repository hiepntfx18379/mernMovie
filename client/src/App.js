import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import themeConfig from "./config/theme.config";
import { ToastContainer } from "react-toastify";
import { themeModeSelector } from "./redux/selector";
import { CssBaseline } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import routes from "./routes/router";
import PageWrapper from "./components/common/PageWrapper";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const { themeMode } = useSelector(themeModeSelector);

  return (
    <ThemeProvider theme={themeConfig.custom({ mode: themeMode })}>
      {/* config toastify */}
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        theme={themeMode}
      />

      {/* mui reset css */}
      <CssBaseline />

      <BrowserRouter>
        <Routes>
         
          <Route path="/" element={<MainLayout />}>
            {routes.map((route, index) =>
              route.index ? (
                <Route
                  index
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper state={route.state}>
                        {route.element}
                      </PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              ) : (
                <Route
                  path={route.path}
                  key={index}
                  element={
                    route.state ? (
                      <PageWrapper>{route.element}</PageWrapper>
                    ) : (
                      route.element
                    )
                  }
                />
              )
            )}
          </Route>
          <Route path="*" element={ <Navigate to="/404" replace />} />
          <Route path="/404" element={ <NotFound /> } />
          
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
