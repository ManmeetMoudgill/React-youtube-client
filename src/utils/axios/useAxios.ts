import AxiosContext, { AxiosContextType } from "./context";
import { useContext } from "react";

export const useAxios = (): AxiosContextType => {
  const ctx = useContext<AxiosContextType>(AxiosContext);
  if (!ctx) {
    throw new Error(
      "AxiosContext is not defined. Please check if you have imported the AxiosContext in the component."
    );
  }
  return {
    instance: ctx?.instance,
    axiosError: ctx?.axiosError,
    setAxiosError: ctx?.setAxiosError,
  };
};
