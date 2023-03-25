import axios, { AxiosInstance } from "axios";
import { createContext } from "react";
export interface AxiosContextType {
  instance: AxiosInstance;
}

console.log(import.meta.env);
const initialState: AxiosContextType = {
  instance: axios.create({
    baseURL: `${
      import.meta.env.MODE === "d"
        ? import.meta.env.VITE_API_DEV_URL
        : import.meta.env.VITE_API_PROD_URL
    }`,
    headers: {
      "Content-Type": "application/json",
    },
  }),
};

const AxiosContext = createContext<AxiosContextType>(initialState);
export default AxiosContext;
