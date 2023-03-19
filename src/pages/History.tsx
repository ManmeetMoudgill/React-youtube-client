import React, { memo, useEffect, useCallback, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import Card from "../components/Card";
import { useApi } from "../shell/hooks/custom-http";
import { VideoHistoryResponseType } from "../models/video";
import { useDispatch } from "react-redux";
import { addToVideoHistory } from "../shell/reudx/slicers/video";
import { NotFound } from "../components/NotFound";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import SideBar from "../components/SideBar";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { createSelector } from "reselect";
import InfiniteScroll from "react-infinite-scroll-component";
import { Box, Button, CircularProgress } from "@mui/material";

import {
  Container,
  VideosWrapper,
  Wrapper,
  NotFoundComponent,
} from "./styled-components/History";

const History = () => {
  const getUser = (state: RootState) => state?.user?.user;
  const getVideoHistory = (state: RootState) => state?.video?.videoHistory;

  const rowsPerPage = 8;
  const start = 0;
  const [end, setEnd] = useState(rowsPerPage);

  const getVideoHistoryWithUser = createSelector(
    [getUser, getVideoHistory],
    (user, videoHistory) => ({
      user,
      videoHistory,
    })
  );

  const { user, videoHistory } = useSelector(getVideoHistoryWithUser);
  const dispatch = useDispatch();

  const { makeCall: getVideosHistory, result } =
    useApi<VideoHistoryResponseType>({
      url: `/users/videosHistory/${user?._id}`,
      method: "get",
    });

  const getVideosHistoryMemoized = useCallback(() => {
    return getVideosHistory();
  }, [getVideosHistory]);

  useEffect(() => {
    if (user?._id) {
      getVideosHistoryMemoized().then((res) => {
        if (
          res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
          res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
        ) {
          dispatch(addToVideoHistory(res?.videosHistory));
        }
      });
    }
  }, [getVideosHistoryMemoized, user?._id, dispatch]);

  const data = useMemo(() => {
    return videoHistory?.slice(start, end);
  }, [videoHistory, start, end]);

  const incrementData = useCallback(() => {
    if (end < videoHistory?.length) {
      const newEnd = end + videoHistory?.length - end;
      setEnd(newEnd);
    }
  }, [end, videoHistory?.length, setEnd]);

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
          onClick={incrementData}
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
  }, [incrementData, IsScreenHeightVeryBig]);

  const videoCards = useMemo(() => {
    return data?.map((video) => {
      return (
        <Card
          key={video?.video?._id}
          isHistoryPageCard
          video={video?.video}
          id={video?._id}
        />
      );
    });
  }, [data]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          <InfiniteScroll
            dataLength={videoHistory?.length}
            next={incrementData}
            hasMore={data?.length < videoHistory?.length}
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
            <Wrapper arrayLength={videoCards?.length}>
              {videoCards?.length > 0 && videoCards}
            </Wrapper>
            {IsScreenHeightVeryBig && data?.length < videoHistory?.length
              ? LoadButton
              : undefined}
          </InfiniteScroll>
        </VideosWrapper>
      </Container>
      {result && videoHistory?.length === 0 ? (
        <NotFoundComponent>
          <NotFound />
        </NotFoundComponent>
      ) : undefined}
    </>
  );
};

export default memo(History);
