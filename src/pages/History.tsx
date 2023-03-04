import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../shell/reudx";
import Card from "../components/Card";
import { useApi } from "../shell/hooks/custom-http";
import { VideoHistoryResponseType } from "../models/video";
import { useDispatch } from "react-redux";
import { addToVideoHistory } from "../shell/reudx/slicers/video";
import { useHttpLoading } from "../shell/hooks/use-http-loading";
import { NotFound } from "../components/NotFound";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
`;

const History = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const videoHistory = useSelector(
    (state: RootState) => state.video.videoHistory
  );
  const dispatch = useDispatch();
  const { isLoading } = useHttpLoading();

  const { makeCall: getVideosHistory } = useApi<VideoHistoryResponseType>({
    url: `/users/videosHistory/${user?._id}`,
    method: "get",
  });

  useEffect(() => {
    if (user?._id) {
      getVideosHistory().then((res) => {
        if (res?.status === 200 || res?.status === 201) {
          dispatch(addToVideoHistory(res?.videosHistory));
        }
      });
    }
  }, [dispatch, getVideosHistory, user?._id]);

  return (
    <Container>
      {videoHistory?.map((video) => {
        return (
          <Card
            key={video?.video?._id}
            isHistoryPageCard
            video={video?.video}
            id={video?._id}
          />
        );
      })}
      {!isLoading && videoHistory?.length === 0 && <NotFound />}
    </Container>
  );
};

export default memo(History);
