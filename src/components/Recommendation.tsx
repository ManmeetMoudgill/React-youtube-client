import React, { memo } from "react";
import styled from "styled-components";
import { VideosResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import Card from "./Card";
type Props = {
  tags: string[];
  currrentVideoId: string;
};
const Container = styled.div`
  flex: 3;
`;

const RecommendationComponent = ({ tags, currrentVideoId }: Props) => {
  const { result: videos } = useApi<VideosResponse>({
    url: `/videos/tags/?tags=${tags?.join(",")}`,
    method: "get",
    onBootstrap: true,
  });

  return (
    <Container>
      {videos?.videos &&
        videos?.videos?.map((video) => {
          if (video?._id === currrentVideoId) return null;
          return <Card type="sm" key={video?._id} video={video} />;
        })}
    </Container>
  );
};

export default memo(RecommendationComponent);
