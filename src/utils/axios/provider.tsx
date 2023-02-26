import axios, { AxiosError } from "axios";
import AxiosContext from "./context";
import { useState } from "react";
export const AxiosProvider = ({ children }: any) => {
  const [axiosError, setAxiosError] = useState<AxiosError | null>(null);

  const instance = axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Add a request interceptor

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
      setAxiosError(null);
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error: AxiosError) {
      setAxiosError(error);

      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return (
    <AxiosContext.Provider value={{ instance, axiosError, setAxiosError }}>
      {children}
    </AxiosContext.Provider>
  );
};
