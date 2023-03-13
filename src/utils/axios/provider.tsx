import axios, { AxiosError } from "axios";
import AxiosContext from "./context";
import { useDispatch } from "react-redux";
import { useEventCallback } from "@mui/material";
import { logout } from "../../shell/reudx/slicers/user";

import { emptyVideosFromHistory } from "../../shell/reudx/slicers/video";
import { HTTP_RESPONSE_STATUS_CODE } from "../../constants";
import { CustomResponse as ErrorResponse } from "../../models/user";
import { createToastError } from "../errors";
import { useEffect } from "react";
export const AxiosProvider = ({ children }: any) => {
  const dispatch = useDispatch();

  const handleUnauthorizedAccess = useEventCallback(() => {
    dispatch(logout());
    dispatch(emptyVideosFromHistory());
  });

  const instance = axios.create({
    baseURL: ``,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor

  useEffect(() => {
    instance.interceptors.request.use(
      function (config) {
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );

    // Add a response interceptor

    instance.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error: AxiosError) {
        if (
          error.response?.status === HTTP_RESPONSE_STATUS_CODE.UN_AUTHORIZED
        ) {
          handleUnauthorizedAccess();
        }
        const { response } = error;

        const backendResponseError = response?.data as ErrorResponse;
        createToastError(
          `${backendResponseError?.status || error?.response?.status} - ${
            backendResponseError?.message || error?.message
          }`,
          "error"
        );
        return Promise.reject(error);

        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
      }
    );
  }, [
    handleUnauthorizedAccess,
    instance.interceptors.request,
    instance.interceptors.response,
  ]);

  return (
    <AxiosContext.Provider value={{ instance }}>
      {children}
    </AxiosContext.Provider>
  );
};
