import { useState, useEffect, useReducer } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useHttpLoading } from "../use-http-loading";
import { useAxios } from "../../../utils/axios/useAxios";
import { useEventCallback } from "@mui/material";

interface ApiConfig {
  url: string;
  method?: AxiosRequestConfig["method"];
  headers?: AxiosRequestConfig["headers"];
  data?: AxiosRequestConfig["data"];
  onBootstrap?: boolean;
}

interface UseApiResult<BackendResponse> {
  result: BackendResponse | undefined;
  makeCall: (
    params?: AxiosRequestConfig
  ) => Promise<BackendResponse | undefined>;
  isLoading: boolean;
}

type Action = { type: "SET_LOADING"; isLoading: boolean };

function reducer(state: boolean, action: Action) {
  switch (action.type) {
    case "SET_LOADING":
      return action.isLoading;
    default:
      return state;
  }
}

export function useApi<BackendResponse = any>({
  url,
  method = "get",
  data,
  onBootstrap = false,
}: ApiConfig): UseApiResult<BackendResponse> {
  const { instance } = useAxios();
  const [result, setResult] = useState<BackendResponse | undefined>(undefined);
  const { addLoading, removeLoading } = useHttpLoading();
  const [isLoading, dispatch] = useReducer(reducer, false);

  const makeCall = useEventCallback(
    async (
      params?: AxiosRequestConfig
    ): Promise<BackendResponse | undefined> => {
      try {
        dispatch({ type: "SET_LOADING", isLoading: true });
        addLoading();
        const response: AxiosResponse<BackendResponse> = await instance({
          url,
          method,
          data,
          ...params,
        });
        setResult(response?.data);
        return response?.data;
      } catch (error: any) {
        console.error(error);
        return undefined;
      } finally {
        removeLoading();
        dispatch({ type: "SET_LOADING", isLoading: false });
      }
    }
  );

  useEffect(() => {
    if (onBootstrap) {
      makeCall();
    }
  }, [makeCall, onBootstrap]);

  return { result, makeCall, isLoading };
}
