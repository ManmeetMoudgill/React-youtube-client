import axios, { AxiosInstance } from "axios";
import { createContext } from "react";
export interface AxiosContextType {
  instance: AxiosInstance;
}

const initialState: AxiosContextType = {
  instance: axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
};

const AxiosContext = createContext<AxiosContextType>(initialState);
export default AxiosContext;
