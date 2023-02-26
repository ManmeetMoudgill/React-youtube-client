import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { Video, VideosResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import { NotFound } from "../components/NotFound";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
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
  }, [type]);

  return (
    <>
      <Container>
        {data &&
          data?.map((video) => {
            return <Card key={video?._id} video={video} />;
          })}
      </Container>
      {!isLoading && data?.length === 0 && <NotFound />}
    </>
  );
};

export default memo(Home);
