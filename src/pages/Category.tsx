import React, { memo } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useApi } from "../shell/hooks/custom-http";
import { VideosResponse } from "../models/video";
import Card from "../components/Card";
import { NotFound } from "../components/NotFound";
const Container = styled.div`
  flex: 3;
`;

const Category = () => {
  const params = useParams();
  console.log(params);
  const { result: videos, isLoading } = useApi<VideosResponse>({
    url: `/videos/tags/?tags=${params}`,
    method: "get",
    onBootstrap: true,
  });
  return (
    <Container>
      {videos?.videos &&
        videos?.videos?.map((video) => {
          return <Card key={video?._id} video={video} />;
        })}
      {!isLoading && videos?.videos?.length === 0 && <NotFound />}
    </Container>
  );
};

export default memo(Category);
