import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import { useHttpLoading } from "../shell/hooks/use-http-loading";
import { CircularProgress, LinearProgress } from "@mui/material";
import { lazy, Suspense } from "react";
import { PrivateRoute } from "../components/PrivateRoute";
import { NonPrivateRoute } from "../components/NonPrivateRoute";
import "./app.css";
const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  width:100%
  border: 2px solid green;
  background-color: ${({ theme }) => theme.bg};
`;
const Wrapper = styled.div`
  border: 2px solid blue;
`;

interface AppContainerProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const HomeLazyLoadComponent = lazy(() => import("../pages/Home"));
const SignInLazyLoadComponent = lazy(() => import("../pages/SignIn"));
const VideoLazyLoadComponent = lazy(() => import("../pages/Video"));
const SearchLazyLoadComponent = lazy(() => import("../pages/Search"));
const HistoryLazyLoadComponent = lazy(() => import("../pages/History"));

const CategoryLazyLoadComponent = lazy(() => import("../pages/Category"));
function AppContainer({ darkMode, setDarkMode }: AppContainerProps) {
  const { isLoading } = useHttpLoading();

  return (
    <>
      {isLoading ? <LinearProgress color="warning" /> : null}
      <Container>
        <BrowserRouter>
          <Main>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Wrapper>
              <Suspense
                fallback={
                  <CircularProgress
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                    }}
                    color="warning"
                  />
                }
              >
                <Routes>
                  <Route path="/">
                    <Route
                      index
                      element={
                        <NonPrivateRoute>
                          <HomeLazyLoadComponent type="random" />
                        </NonPrivateRoute>
                      }
                    />
                    <Route
                      path="trends"
                      element={
                        <NonPrivateRoute>
                          <HomeLazyLoadComponent type="trend" />
                        </NonPrivateRoute>
                      }
                    />

                    <Route
                      path="subscriptions"
                      element={
                        <PrivateRoute>
                          <HomeLazyLoadComponent type="sub" />
                        </PrivateRoute>
                      }
                    />

                    <Route
                      path="search"
                      element={
                        <NonPrivateRoute>
                          <SearchLazyLoadComponent />
                        </NonPrivateRoute>
                      }
                    />
                    <Route
                      path="signin"
                      element={
                        <NonPrivateRoute>
                          <SignInLazyLoadComponent />
                        </NonPrivateRoute>
                      }
                    />

                    <Route
                      path="history"
                      element={
                        <PrivateRoute>
                          <HistoryLazyLoadComponent />{" "}
                        </PrivateRoute>
                      }
                    />
                    <Route path="category">
                      <Route
                        path=":category"
                        element={<CategoryLazyLoadComponent />}
                      />
                    </Route>

                    <Route path="video">
                      <Route path=":id" element={<VideoLazyLoadComponent />} />
                    </Route>
                  </Route>
                </Routes>
              </Suspense>
            </Wrapper>
          </Main>
        </BrowserRouter>
      </Container>
    </>
  );
}

export default AppContainer;
