import React, { memo } from "react";
import { VideoType } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import {
  Container,
  LargeDevicesVideos,
  SmallDevicesVideos,
} from "./styled-components/Reccomendation";
import Card from "./Card";
import ReccomendationVideoSmall from "./ReccomendationVideoSmall";
type Props = {
  tags: string[];
  currrentVideoId: string;
};

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
