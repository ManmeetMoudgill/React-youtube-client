import React, { memo } from "react";
import { Video } from "../models/video";
import { User } from "../models/user";
import {
  Container,
  LeftContainer,
  RightContainer,
  Image,
  Details,
  ChannelName,
  Texts,
  Title,
  Info,
} from "./styled-components/RecommendationVideoSmall";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
interface RecomendationCardProps {
  video?: Video;
  user?: User;
}

const ReccomendationVideoSmall = ({ video, user }: RecomendationCardProps) => {
  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container>
        <LeftContainer>
          <Image src={video?.imgUrl} title={video?.title} />
        </LeftContainer>

        <RightContainer>
          <Details>
            <Texts>
              <Title>{video?.title?.slice(0, 25)}....</Title>
              <ChannelName>{user?.name}</ChannelName>

              <Info>
                {video?.views} views •{" "}
                {video?.createdAt
                  ? formatDistanceToNow(new Date(video?.createdAt), {
                      addSuffix: true,
                    })
                  : ""}
              </Info>
            </Texts>
          </Details>
        </RightContainer>
      </Container>
    </Link>
  );
};

export default memo(ReccomendationVideoSmall);
