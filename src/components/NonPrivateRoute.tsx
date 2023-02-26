import { ReactElement, useEffect } from "react";
import { useAxios } from "../utils/axios/useAxios";
import { toast } from "react-toastify";

interface Props {
  children: ReactElement | JSX.Element | React.ReactNode;
}

export const NonPrivateRoute = ({ children }: Props): ReactElement => {
  const { axiosError } = useAxios();

  useEffect(() => {
    if (axiosError) {
      toast(
        `Error: ${axiosError?.response?.status} ${axiosError?.response?.statusText}`,
        {
          type: `${
            axiosError?.response?.status === 401 || 400 ? "error" : "warning"
          }`,
        }
      );
    }
  }, [axiosError]);

  return <>{children}</>;
};
