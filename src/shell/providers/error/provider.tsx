import ErrorContext, { ErrorType } from "./context";
import { useState } from "react";
import { useEventCallback } from "@mui/material";
import { AxiosError } from "axios";

export const ErrorProvider = ({ children }: any) => {
  const [error, setError] = useState<AxiosError | null>(null);

  const setErrorHandler = useEventCallback((error: AxiosError) => {
    setError(error);
  });

  return (
    <ErrorContext.Provider value={{ error, setError: setErrorHandler }}>
      {children}
    </ErrorContext.Provider>
  );
};
