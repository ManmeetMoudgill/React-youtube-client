import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { useParams } from "react-router-dom";
import { useApi } from "../shell/hooks/custom-http";
import { GetVideosWithUser, VideosResponse } from "../models/video";
import Card from "../components/Card";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import {
  Container,
  VideosWrapper,
  Wrapper,
  NotFoundComponent,
} from "./styled-components/Category";
import {
  reducer,
  initialState,
  State,
  Action,
  ActionType,
} from "../pages/utils/index";
import { AxiosRequestConfig } from "axios";
import debounce from "lodash.debounce";
import InfiniteScroll from "react-infinite-scroll-component";
import { CircularProgress } from "@mui/material";
const Category = () => {
  const params = useParams();
  const [data, setData] = useState<GetVideosWithUser[]>([]);
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const { makeCall: getVideoBasedOnCategory, result } = useApi<VideosResponse>({
    url: `/videos/tags/?tags=${params?.id}&page=${state?.page}`,
    method: "get",
    onBootstrap: false,
  });

  const getVideoBasedOnCategoryMemoizedFn = useCallback(
    (params?: AxiosRequestConfig) => {
      return getVideoBasedOnCategory(params);
    },
    [getVideoBasedOnCategory]
  );

  const fetchData = useCallback(async () => {
    const res = await getVideoBasedOnCategoryMemoizedFn({
      url: `/videos/tags/?tags=${params?.id}&page=${state?.page}`,
    });
    if (
      res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
      res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
    ) {
      setData((prev) => {
        const videos = res?.videos;
        const newData = videos?.length === 0 ? [] : [...videos];
        if (state?.page === 1) {
          return newData;
        }
        if (prev) {
          const dataArray = [...prev, ...videos];
          const removedDuplicatedData = dataArray.filter(
            (item, index) =>
              dataArray.findIndex((i) => i?.video?._id === item?.video?._id) ===
              index
          );
          return removedDuplicatedData;
        }
        return newData;
      });
    }
  }, [state?.page, params?.id, getVideoBasedOnCategoryMemoizedFn]);

  // memoize the debounced function using useMemo
  const debouncedFetchData = useMemo(
    () => debounce(fetchData, 300),
    [fetchData]
  );

  useEffect(() => {
    debouncedFetchData();
    return () => debouncedFetchData.cancel();
  }, [debouncedFetchData]);

  const videoCards = useMemo(() => {
    return data?.map((video) => {
      return (
        <Card key={video?.video?._id} video={video?.video} user={video?.user} />
      );
    });
  }, [data]);

  const fetchMoreData = useCallback(() => {
    if (result && data?.length > result?.count) return;
    dispatch({ type: ActionType.SET_PAGE, payload: state?.page + 1 });
  }, [result, data?.length, dispatch, state?.page]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          {result && (
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={fetchMoreData}
              hasMore={data?.length < result?.count}
              loader={<CircularProgress size="1rem" />}
            >
              <Wrapper arrayLength={videoCards?.length}>
                {videoCards?.length > 0 && videoCards}
              </Wrapper>
            </InfiniteScroll>
          )}
        </VideosWrapper>
      </Container>
      {result && data?.length === 0 ? (
        <NotFoundComponent>
          <NotFound />
        </NotFoundComponent>
      ) : undefined}
    </>
  );
};

export default memo(Category);
