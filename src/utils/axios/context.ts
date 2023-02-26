import axios, { AxiosError, AxiosInstance } from "axios";
import { createContext } from "react";
export interface AxiosContextType {
  instance: AxiosInstance;
  axiosError: AxiosError | null;
  setAxiosError: React.Dispatch<
    React.SetStateAction<AxiosError<unknown, any> | null>
  >;
}

const initialState: AxiosContextType = {
  instance: axios.create({
    baseURL: "",
    headers: {
      "Content-Type": "application/json",
    },
  }),
  axiosError: null,
  setAxiosError: () => {},
};

const AxiosContext = createContext<AxiosContextType>(initialState);
export default AxiosContext;
