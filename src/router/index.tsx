import { ReactElement, useMemo } from "react";
import { useHttpLoading } from "../shell/hooks/use-http-loading";
import { createShellRoutes } from "./shell-config";
import { useRoutes } from "react-router-dom";

export default function AppRoutes(): ReactElement | null {
  const { addLoading, removeLoading } = useHttpLoading();

  const shellRoutes = useMemo(() => {
    return createShellRoutes({
      addLoading,
      removeLoading,
    });
  }, [addLoading, removeLoading]);

  const routes = useRoutes(shellRoutes);
  return routes;
}
