import axios, { AxiosInstance } from "axios";
import { createContext } from "react";
export interface AxiosContextType {
  instance: AxiosInstance;
}

const initialState: AxiosContextType = {
  instance: axios.create({
    baseURL: `${
      process.env.MODE === "development"
        ? process.env.REACT_API_DEV_URL
        : process.env.REACT_API_PROD_URL
    }`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
};

const AxiosContext = createContext<AxiosContextType>(initialState);
export default AxiosContext;
