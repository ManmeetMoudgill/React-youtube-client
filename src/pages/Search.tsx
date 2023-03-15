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
import { Typography } from "@mui/material";
export interface State {
  page: number;
}

export enum ActionType {
  SET_PAGE = "SET_PAGE",
}

export type Action = { type: ActionType.SET_PAGE; payload: number };

const initialState: State = {
  page: 1,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
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
        return state?.page === 1
          ? res?.videos || []
          : [...prev, ...(res?.videos || [])];
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
              loader={<Typography>Loading...</Typography>}
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
