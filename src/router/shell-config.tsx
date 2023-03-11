import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { RoutesConfig } from "./routes-config";
import { PrivateRoute } from "../components/PrivateRoute";

interface CreateShellRoutesParams {
  addLoading: () => void;
  removeLoading: () => void;
}

export const MainRoute = (): ReactElement => {
  return (
    <Suspense fallback={<LinearProgress />}>
      <Outlet />
    </Suspense>
  );
};

export const createShellRoutes = ({
  addLoading,
  removeLoading,
}: CreateShellRoutesParams): RoutesConfig => {
  const HomeLazyLoadComponent = lazy(() => {
    addLoading();
    return import("../pages/Home").finally(() => removeLoading());
  });
  const RegistrationComponent = lazy(() => {
    addLoading();
    return import("../pages/Registration").finally(() => removeLoading());
  });

  const VideoLazyLoadComponent = lazy(() => {
    addLoading();
    return import("../pages/Video").finally(() => removeLoading());
  });

  const HistoryLazyLoadComponent = lazy(() => {
    addLoading();
    return import("../pages/History").finally(() => removeLoading());
  });

  const SearchLazyLoadComponent = lazy(() => {
    addLoading();
    return import("../pages/Search").finally(() => removeLoading());
  });

  const CategoryLazyLoadComponent = lazy(() => {
    return import("../pages/Category").finally(() => removeLoading());
  });

  const routes = [
    {
      path: "",
      element: <MainRoute />,
      children: [
        {
          path: "",
          element: <HomeLazyLoadComponent type="random" />,
        },
        {
          path: "/trends",
          element: <HomeLazyLoadComponent type="trend" />,
        },
        {
          path: "/subscriptions",
          element: <PrivateRoute />,
          children: [
            {
              path: "",
              element: <HomeLazyLoadComponent type="sub" />,
            },
          ],
        },
        {
          path: "/history",
          element: <PrivateRoute />,
          children: [
            {
              path: "",
              element: <HistoryLazyLoadComponent />,
            },
          ],
        },
        {
          path: "/search",
          element: <SearchLazyLoadComponent />,
        },
        {
          path: "/category/:id",
          element: <CategoryLazyLoadComponent />,
        },
        {
          path: "/video/:id",
          element: <VideoLazyLoadComponent />,
        },
        {
          path: "/signin",
          element: <RegistrationComponent />,
        },
      ],
    },
  ];

  return routes;
};