import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../shell/reudx";
import { useSelector } from "react-redux";

export const PrivateRoute = (): ReactElement => {
  const user = useSelector((state: RootState) => state.user);

  if (!user?.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};
