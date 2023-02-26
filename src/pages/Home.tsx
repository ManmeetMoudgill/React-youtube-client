import React, { memo } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { VideosResponse } from "../models/video";
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
  const { result: data, isLoading } = useApi<VideosResponse>({
    url: `/videos/${type}`,
    method: "get",
    onBootstrap: true,
  });

  return (
    <>
      <Container>
        {(data as VideosResponse)?.videos &&
          (data as VideosResponse)?.videos?.map((video) => {
            return <Card key={video?._id} video={video} />;
          })}
      </Container>
      {!isLoading && data?.videos?.length === 0 && <NotFound />}
    </>
  );
};

export default memo(Home);
