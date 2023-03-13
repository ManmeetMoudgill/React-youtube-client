import React, { memo, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import Card from "../components/Card";
import { useApi } from "../shell/hooks/custom-http";
import { VideoHistoryResponseType } from "../models/video";
import { useDispatch } from "react-redux";
import { addToVideoHistory } from "../shell/reudx/slicers/video";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import { createSelector } from "reselect";
import {
  Container,
  VideosWrapper,
  Wrapper,
  NotFoundComponent,
} from "./styled-components/History";
const History = () => {
  const getUser = (state: RootState) => state?.user?.user;
  const getVideoHistory = (state: RootState) => state?.video?.videoHistory;

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

  const videoCards = useMemo(() => {
    return videoHistory?.map((video) => {
      return (
        <Card
          key={video?.video?._id}
          isHistoryPageCard
          video={video?.video}
          id={video?._id}
        />
      );
    });
  }, [videoHistory]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          <Wrapper>{videoCards?.length > 0 && videoCards}</Wrapper>
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
