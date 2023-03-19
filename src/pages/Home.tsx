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
import AutorenewIcon from "@mui/icons-material/Autorenew";
import {
  Wrapper,
  VideosWrapper,
  Container,
  NotFoundComponent,
} from "./styled-components/Home";
import { AxiosRequestConfig } from "axios";
import { Box, Button, CircularProgress } from "@mui/material";
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

  const IsScreenHeightVeryBig = window.innerHeight > 1000;

  const LoadButton = useMemo((): JSX.Element => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "hidden",
        }}
      >
        <Button
          onClick={fetchMoreData}
          style={{
            display: `${IsScreenHeightVeryBig ? "flex" : "none"}`,
            justifyContent: "center",
            alignItems: "center",
            overflowY: "hidden",
          }}
        >
          <AutorenewIcon />
          Load more
        </Button>
      </Box>
    );
  }, [fetchMoreData, IsScreenHeightVeryBig]);
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
              loader={
                <div
                  style={{
                    display: `${IsScreenHeightVeryBig ? "none" : "flex"}`,
                    justifyContent: "center",
                    alignItems: "center",
                    overflowY: "hidden",
                  }}
                >
                  <CircularProgress size="1rem" />
                </div>
              }
            >
              <Wrapper arrayLength={data?.length}>
                {data?.length > 0 && videoCards}
              </Wrapper>

              {IsScreenHeightVeryBig && result && data?.length < result?.count
                ? LoadButton
                : undefined}
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
