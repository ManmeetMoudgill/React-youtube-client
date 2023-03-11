import { ReactElement } from "react";

export interface RouteConfig {
  path: string;
  element?: ReactElement;
  name?: string;
  children?: RoutesConfig;
  hidden?: boolean;
}

export type RoutesConfig = RouteConfig[];
