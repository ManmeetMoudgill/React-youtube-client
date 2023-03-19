import React, {
  memo,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useReducer,
} from "react";
import { useLocation } from "react-router-dom";
import { useApi } from "../shell/hooks/custom-http";
import { GetVideosWithUser, VideosResponse } from "../models/video";
import Card from "../components/Card";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";
import {
  Container,
  Wrapper,
  VideosWrapper,
  NotFoundComponent,
} from "./styled-components/Search";
import { AxiosRequestConfig } from "axios";
import { CircularProgress } from "@mui/material";
import {
  reducer,
  initialState,
  State,
  Action,
  ActionType,
} from "./utils/index";
const Search = () => {
  const location = useLocation();
  const [data, setData] = useState<GetVideosWithUser[]>([]);

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const { makeCall: getVideosBySearch, result } = useApi<VideosResponse>({
    url: `/videos/search${location?.search}`,
    method: "get",
    onBootstrap: false,
  });

  const getVideosBySearchMemoizedFn = useCallback(
    (params?: AxiosRequestConfig) => {
      return getVideosBySearch(params);
    },
    [getVideosBySearch]
  );

  const fetchData = useCallback(async () => {
    //when user clicks on a category, we need to reset the page to 1

    const res = await getVideosBySearchMemoizedFn({
      url: `/videos/search${location?.search}&page=${state?.page}`,
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
  }, [state?.page, location?.search, getVideosBySearchMemoizedFn]);

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

    //DISPATCH THE ACTION TO SET THE PAGE
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
              <Wrapper arraylength={data?.length}>
                {data?.length > 0 && videoCards}
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

export default memo(Search);
