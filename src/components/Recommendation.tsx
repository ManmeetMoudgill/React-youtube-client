import React, {
  memo,
  useMemo,
  useReducer,
  useCallback,
  useState,
  useEffect,
} from "react";
import { GetVideosWithUser, VideosResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import {
  Container,
  LargeDevicesVideos,
  SmallDevicesVideos,
} from "./styled-components/Reccomendation";
import Card from "./Card";
import ReccomendationVideoSmall from "./ReccomendationVideoSmall";
import { AxiosRequestConfig } from "axios";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import debounce from "lodash.debounce";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Box, Button, CircularProgress } from "@mui/material";

import InfiniteScrollComponent from "./InfiniteScroll";
import {
  reducer,
  initialState,
  State,
  Action,
  ActionType,
} from "../pages/utils/index";
type Props = {
  tags?: string[];
  currrentVideoId?: string;
};

const RecommendationComponent = ({ tags, currrentVideoId }: Props) => {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const [data, setData] = useState<GetVideosWithUser[]>([]);

  const { result, makeCall: getVideosByTags } = useApi<VideosResponse>({
    url: `/videos/tags/?tags=${tags?.join(",")}&page=${state?.page}`,
    method: "get",
    onBootstrap: false,
  });

  useEffect(() => {
    dispatch({ type: ActionType.SET_PAGE, payload: 1 });
  }, [tags]);

  const getVideosByTagsMemoizedFn = useCallback(
    (params?: AxiosRequestConfig) => {
      return getVideosByTags(params);
    },
    [getVideosByTags]
  );

  const fetchData = useCallback(async () => {
    //when user clicks on a category, we need to reset the page to 1

    const res = await getVideosByTagsMemoizedFn({
      url: `/videos/tags/?tags=${tags?.join(",")}&page=${state?.page}`,
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
  }, [state?.page, tags, getVideosByTagsMemoizedFn]);

  // memoize the debounced function using useMemo
  const debouncedFetchData = useMemo(
    () => debounce(fetchData, 300),
    [fetchData]
  );

  useEffect(() => {
    debouncedFetchData();
    return () => debouncedFetchData.cancel();
  }, [debouncedFetchData]);

  const largeVideoCards = useMemo(() => {
    return data?.map((item) => {
      if (item?.video?._id === currrentVideoId) return null;
      return (
        <Card
          type="sm"
          key={item?.video?._id}
          video={item?.video}
          user={item?.user}
        />
      );
    });
  }, [data, currrentVideoId]);

  const smallVideoCards = useMemo(() => {
    return data?.map((item) => {
      if (item?.video?._id === currrentVideoId) return null;

      return (
        <ReccomendationVideoSmall
          key={item?.video?._id}
          video={item?.video}
          user={item?.user}
        />
      );
    });
  }, [data, currrentVideoId]);

  const fetchMoreData = useCallback(() => {
    dispatch({ type: ActionType.SET_PAGE, payload: state.page + 1 });
  }, [state.page, dispatch]);

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
    <Container>
      <LargeDevicesVideos>
        {result && (
          <InfiniteScrollComponent
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
            {largeVideoCards}
            {IsScreenHeightVeryBig && result && data?.length < result?.count
              ? LoadButton
              : undefined}
          </InfiniteScrollComponent>
        )}
      </LargeDevicesVideos>
      <SmallDevicesVideos>
        {result && (
          <InfiniteScrollComponent
            dataLength={data?.length || 0}
            next={fetchMoreData}
            hasMore={data?.length < result?.count}
            loader={<CircularProgress size="1rem" />}
          >
            {smallVideoCards}
          </InfiniteScrollComponent>
        )}
      </SmallDevicesVideos>
    </Container>
  );
};

export default memo(RecommendationComponent);
