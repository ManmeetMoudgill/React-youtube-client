import { useState, useCallback, useEffect } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useHttpLoading } from "../use-http-loading";
import { useAxios } from "../../../utils/axios/useAxios";

interface ApiConfig {
  url: string;
  method: AxiosRequestConfig["method"];
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

export function useApi<BackendResponse = any>({
  url,
  method = "get",
  data,
  onBootstrap = false,
}: ApiConfig): UseApiResult<BackendResponse> {
  const { instance } = useAxios();
  const [result, setResult] = useState<BackendResponse | undefined>(undefined);
  const { addLoading, removeLoading } = useHttpLoading();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const makeCall = useCallback(
    async (params?: AxiosRequestConfig) => {
      try {
        addLoading();
        setIsLoading(true);
        const response: AxiosResponse<BackendResponse> = await instance({
          url,
          method,
          data,
          ...params,
        });
        removeLoading();
        setIsLoading(false);
        return response?.data;
      } catch (error: any) {
        setIsLoading(false);
        removeLoading();
      }
    },
    [url, method, data, addLoading, removeLoading, instance]
  );

  useEffect(() => {
    if (onBootstrap) {
      makeCall().then((response) => {
        setResult(response);
      });
    }
  }, [makeCall, onBootstrap]);

  return { result, makeCall, isLoading };
}
