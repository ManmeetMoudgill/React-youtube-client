import React, {
  memo,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import Card from "../components/Card";
import { GetVideosWithUser, VideosResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import CategoriesSroll from "../components/CategoriesSroll";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import InfiniteScroll from "react-infinite-scroll-component";
import debounce from "lodash.debounce";
import {
  Wrapper,
  VideosWrapper,
  Container,
  NotFoundComponent,
} from "./styled-components/Home";
import { AxiosRequestConfig } from "axios";
import { CircularProgress } from "@mui/material";
import { State, initialState, reducer, Action, ActionType } from "./utils/home";
interface HomeProps {
  type?: string;
}

//create a reducer to handle thepageingation and the category filter

const Home = ({ type }: HomeProps) => {
  const [data, setData] = useState<GetVideosWithUser[]>([]);

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const { makeCall: getVideos, result } = useApi<VideosResponse>({
    url: `/videos/${type}?page=${state?.page}`,
    method: "get",
    onBootstrap: false,
  });

  const getVideosMemoizedFn = useCallback(
    (params?: AxiosRequestConfig) => {
      return getVideos(params);
    },
    [getVideos]
  );

  const fetchData = useCallback(async () => {
    //when user clicks on a category, we need to reset the page to 1
    const isSubscriptionPage = type === "sub";
    const category = isSubscriptionPage
      ? ""
      : state?.category
      ? `&category=${state?.category}` || "&category=all"
      : "";
    const res = await getVideosMemoizedFn({
      url: `/videos/${type}?page=${state?.page}${category}`,
    });
    if (
      res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
      res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
    ) {
      setData((prev) => {
        if (res?.videos?.length === 0) {
          return [];
        }
        const newData = [...res.videos];
        if (state?.page === 1) {
          return newData;
        }
        if (prev) {
          const dataArray = [...prev, ...res.videos];
          const uniqueData = dataArray.filter(
            (item, index) => dataArray.indexOf(item) === index
          );
          return uniqueData;
        }
        return newData;
      });
    }
  }, [getVideosMemoizedFn, state?.page, state?.category, type]);

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
    return data?.map((item) => {
      return (
        <Card key={item?.video?._id} video={item?.video} user={item?.user} />
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
          {type === "random" ? (
            <CategoriesSroll dispatch={dispatch} state={state} />
          ) : undefined}
          {result && (
            <InfiniteScroll
              dataLength={data?.length || 0}
              next={fetchMoreData}
              hasMore={data?.length < result?.count}
              loader={<CircularProgress size="small" />}
            >
              <Wrapper arrayLength={data?.length}>
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

export default memo(Home);
