import { ReactElement, useCallback } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RootState } from "../shell/reudx";
import { useSelector } from "react-redux";
import { useAxios } from "../utils/axios/useAxios";
import { useDispatch } from "react-redux";
import { logout } from "../shell/reudx/slicers/user";
import {
  emptyVideosFromHistory,
  removeVideo,
} from "../shell/reudx/slicers/video";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";

interface Props {
  children: ReactElement | JSX.Element | React.ReactNode;
}

export const PrivateRoute = ({ children }: Props): ReactElement => {
  const user = useSelector((state: RootState) => state.user);
  const { axiosError } = useAxios();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUnauthorizedAccess = useCallback(() => {
    dispatch(logout());
    dispatch(emptyVideosFromHistory());
    dispatch(removeVideo());
    navigate("/");
  }, [dispatch, navigate]);

  if (
    axiosError !== null &&
    axiosError?.response?.status === HTTP_RESPONSE_STATUS_CODE.UN_AUTHORIZED
  ) {
    handleUnauthorizedAccess();
  }

  if (!user?.user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
