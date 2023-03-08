import React, { memo, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import Card from "../components/Card";
import { useApi } from "../shell/hooks/custom-http";
import { VideoHistoryResponseType } from "../models/video";
import { useDispatch } from "react-redux";
import { addToVideoHistory } from "../shell/reudx/slicers/video";
import { useHttpLoading } from "../shell/hooks/use-http-loading";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import {
  Container,
  VideosWrapper,
  Wrapper,
  NotFoundComponent,
} from "./styled-components/History";
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
        if (
          res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
          res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
        ) {
          dispatch(addToVideoHistory(res?.videosHistory));
        }
      });
    }
  }, [dispatch, getVideosHistory, user?._id]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          <Wrapper>
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
          </Wrapper>
        </VideosWrapper>
      </Container>
      <NotFoundComponent>
        {!isLoading && videoHistory?.length === 0 && <NotFound />}
      </NotFoundComponent>
    </>
  );
};

export default memo(History);
