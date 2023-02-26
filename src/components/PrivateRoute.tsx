import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { RootState } from "../shell/reudx";
import { useSelector } from "react-redux";

interface Props {
  children: ReactElement | JSX.Element | React.ReactNode;
}

export const PrivateRoute = ({ children }: Props): ReactElement => {
  const user = useSelector((state: RootState) => state.user);

  if (!user?.user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};
