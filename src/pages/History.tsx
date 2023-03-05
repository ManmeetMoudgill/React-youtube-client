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
import SideBar from "../components/SideBar";

const Container = styled.div`
  display: flex;
  min-width: 100vw;
  margin-top: 2.5rem;
  justify-content: center;
  position: relative;
`;
const VideosWrapper = styled.div`
  display: flex;
  flex: 1;
  margin-left: 7rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  @media (min-width: 320px) and (max-width: 400px) {
    margin-left: 3rem;
  }
  @media (min-width: 401px) and (max-width: 720px) {
    margin-left: 4.5rem;
    padding: 0.5rem 1rem 0.5rem 0.2rem;
  }
  @media (min-width: 721px) and (max-width: 1000px) {
    margin-left: 5rem;
    padding: 0.5rem 1rem 0.5rem 0.2rem;
  }
  @media (min-width: 1001px) and (max-width: 1200px) {
    margin-left: 5rem;
  }
  @media (min-width: 1201px) and (max-width: 2600px) {
    margin-left: 7rem;
  }
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 1rem;
  max-width: 100%;
  padding-right: 1rem;
  margin-top: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  @media (max-width: 576px) {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
  @media (min-width: 320px) and (max-width: 500px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
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
      {!isLoading && videoHistory?.length === 0 && <NotFound />}
    </Container>
  );
};

export default memo(History);
