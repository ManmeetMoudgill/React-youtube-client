import React, { memo, useMemo } from "react";
import { VideosResponse } from "../models/video";
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

const RecommendationComponent = ({ tags, currrentVideoId }: Props) => {
  const { result: videos } = useApi<VideosResponse>({
    url: `/videos/tags/?tags=${tags?.join(",")}`,
    method: "get",
    onBootstrap: true,
  });

  const largeVideoCards = useMemo(() => {
    return videos?.videos?.map((item) => {
      if (item?.video?._id === currrentVideoId) return null;
      return (
        <Card
          type="sm"
          key={item?.video?._id}
          video={item?.video}
          user={item?.user}
        />
      );
    });
  }, [videos?.videos, currrentVideoId]);

  const smallVideoCards = useMemo(() => {
    return videos?.videos?.map((item) => {
      if (item?.video?._id === currrentVideoId) return null;

      return (
        <ReccomendationVideoSmall
          key={item?.video?._id}
          video={item?.video}
          user={item?.user}
        />
      );
    });
  }, [videos?.videos, currrentVideoId]);

  return (
    <Container>
      <LargeDevicesVideos>
        {videos?.videos && largeVideoCards}
      </LargeDevicesVideos>
      <SmallDevicesVideos>
        {videos?.videos && smallVideoCards}
      </SmallDevicesVideos>
    </Container>
  );
};

export default memo(RecommendationComponent);
