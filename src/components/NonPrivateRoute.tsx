import { ReactElement, useEffect } from "react";
import { useAxios } from "../utils/axios/useAxios";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { createToastError } from "../utils/errors";

interface Props {
  children: ReactElement | JSX.Element | React.ReactNode;
}

export const NonPrivateRoute = ({ children }: Props): ReactElement => {
  const { axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      createToastError(
        `Error: ${axiosError?.response?.status} ${axiosError?.response?.statusText}`,
        `${
          axiosError?.response?.status ===
            HTTP_RESPONSE_STATUS_CODE.UN_AUTHORIZED ||
          HTTP_RESPONSE_STATUS_CODE.BAD_REQUEST
            ? "error"
            : "warning"
        }`
      );
    }
  }, [axiosError]);

  return <>{children}</>;
};
