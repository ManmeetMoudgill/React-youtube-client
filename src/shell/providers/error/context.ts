import { AxiosError } from "axios";
import { createContext } from "react";
export interface ErrorType {
  error: AxiosError | null;
  setError: (error: AxiosError) => void;
}

const initialState: ErrorType = {
  error: null,
  setError: () => {
    return;
  },
};

const ErrorContext = createContext<ErrorType>(initialState);
export default ErrorContext;
