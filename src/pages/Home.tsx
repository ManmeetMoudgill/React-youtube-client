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
import { Typography } from "@mui/material";
interface HomeProps {
  type?: string;
}

export interface State {
  page: number;
  category: string;
}

export enum ActionType {
  SET_PAGE = "SET_PAGE",
  SET_CATEGORY = "SET_CATEGORY",
}

export type Action =
  | { type: ActionType.SET_PAGE; payload: number }
  | { type: ActionType.SET_CATEGORY; payload: string };

const initialState: State = {
  page: 1,
  category: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_CATEGORY":
      return { ...state, category: action.payload };
    default:
      return state;
  }
};

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
        return state?.page === 1
          ? res?.videos || []
          : [...prev, ...(res?.videos || [])];
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
              loader={<Typography>Loading...</Typography>}
            >
              <Wrapper>{data?.length > 0 && videoCards}</Wrapper>
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
