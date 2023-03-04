import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Video, VideosResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import { NotFound } from "../components/NotFound";
import SideBar from "../components/SideBar";
import CategorisSroll from "../components/CategorisSroll";
const Container = styled.div`
  display: flex;
  margin-top: 3.5rem;
  justify-content: center;
  position: relative;
`;

const VideosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  margin-top: 2rem;
  flex-wrap: wrap;
  gap: 2rem;
`;

interface HomeProps {
  type?: string;
}
const Home = ({ type }: HomeProps) => {
  const [data, setData] = useState<Video[] | undefined>(undefined);
  const { makeCall: getVideos, isLoading } = useApi<VideosResponse>({
    url: `/videos/${type}`,
    method: "get",
    onBootstrap: false,
  });

  useEffect(() => {
    getVideos().then((res) => {
      if (res?.status === 200 || res?.status === 201) {
        setData(res?.videos);
      }
    });
  }, [type, getVideos]);

  return (
    <>
      <Container>
        <SideBar />
        <VideosWrapper>
          <CategorisSroll />
          <Wrapper>
            {data &&
              data?.map((video) => {
                return <Card key={video?._id} video={video} />;
              })}
          </Wrapper>
        </VideosWrapper>
      </Container>
      {!isLoading && data?.length === 0 && <NotFound />}
    </>
  );
};

export default memo(Home);
