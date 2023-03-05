import React, { memo } from "react";
import styled from "styled-components";
import { VideoType } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import Card from "./Card";
import ReccomendationVideoSmall from "./ReccomendationVideoSmall";
type Props = {
  tags: string[];
  currrentVideoId: string;
};
const Container = styled.div`
  flex: 1;
`;

const LargeDevicesVideos = styled.div`
  flex: 1;
  display: none;
  @media (min-width: 1000px) and (max-width: 2600px) {
    display: flex;
  }
`;

const SmallDevicesVideos = styled.div`
  flex: 1;
  @media (min-width: 320px) and (max-width: 999px) {
    display: flex;
  }
  @media (min-width: 1000px) and (max-width: 2600px) {
    display: none;
  }
`;
interface TagsBackendResponse {
  message: string;
  status: number;
  success: boolean;
  videos: Array<VideoType>;
}

const RecommendationComponent = ({ tags, currrentVideoId }: Props) => {
  const { result: videos } = useApi<TagsBackendResponse>({
    url: `/videos/tags/?tags=${tags?.join(",")}`,
    method: "get",
    onBootstrap: true,
  });

  console.log(videos);
  return (
    <Container>
      <LargeDevicesVideos>
        {videos?.videos &&
          videos?.videos?.map((video) => {
            if (video?.video?._id === currrentVideoId) return null;
            return (
              <Card
                type="sm"
                key={video?.video?._id}
                video={video?.video}
                user={video?.user}
              />
            );
          })}
      </LargeDevicesVideos>
      <SmallDevicesVideos>
        {videos?.videos &&
          videos?.videos?.map((video) => {
            if (video?.video?._id === currrentVideoId) return null;
            return (
              <ReccomendationVideoSmall
                key={video?.video?._id}
                video={video?.video}
                user={video?.user}
              />
            );
          })}
      </SmallDevicesVideos>
    </Container>
  );
};

export default memo(RecommendationComponent);
