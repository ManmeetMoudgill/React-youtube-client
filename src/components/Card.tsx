import { formatDistanceToNow } from "date-fns";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import { Video } from "../models/video";
import { Box, IconButton, Tooltip, useEventCallback } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useApi } from "../shell/hooks/custom-http";
import { removeFromVideoHistory } from "../shell/reudx/slicers/video";
import { User } from "../models/user";
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import {
  Container,
  Video as VideoComponent,
  Details,
  ChannelImage,
  Texts,
  Title,
  ChannelName,
  Info,
} from "./styled-components/Card";
interface CardProps {
  type?: string;
  video?: Video;
  isHistoryPageCard?: boolean;
  id?: string;
  user?: User;
}
const Card = ({ type, video, isHistoryPageCard, user, id }: CardProps) => {
  const dispatch = useDispatch();

  const { makeCall: deleteVideoFromHistory } = useApi<{
    success: boolean;
    status: number;
  }>({
    url: `/users/videosHistory/${id}`,
    method: "delete",
  });
  const handleDelete = useEventCallback(() => {
    const videohistoryId = id as string;
    deleteVideoFromHistory().then((res) => {
      if (
        res?.status === HTTP_RESPONSE_STATUS_CODE.OK ||
        res?.status === HTTP_RESPONSE_STATUS_CODE.CREATED
      ) {
        dispatch(removeFromVideoHistory(videohistoryId));
      }
    });
  });

  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  const playVideo = useEventCallback(() => {
    if (videoRef.current) {
      videoRef.current?.play();
    }
  });

  const pauseVideo = useEventCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  });

  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container
        type={type}
        className="animate__animated animate__fadeIn animate__delay-0.5s "
        onMouseEnter={playVideo}
        onMouseLeave={pauseVideo}
      >
        <VideoComponent
          ref={videoRef}
          muted
          title="Keep hovering to play the video"
          type={type}
          src={video?.videoUrl}
          poster={video?.imgUrl}
        />

        <Details type={type} isHistoryPageCard={isHistoryPageCard}>
          {type === "sm" && user ? (
            <ChannelImage
              type={type}
              src={user?.img ? user?.img : "/images/userProva.jfif"}
            />
          ) : (
            <ChannelImage
              type={type}
              src={
                video?.user?.img ? video?.user?.img : "/images/userProva.jfif"
              }
            />
          )}

          <Texts>
            <Title>{video?.title?.slice(0, 25)}..</Title>
            {type === "sm" && user ? (
              <ChannelName>{user?.name}</ChannelName>
            ) : (
              <ChannelName>{video?.user?.name}</ChannelName>
            )}
            <Info>
              {video?.views} views •{" "}
              {video?.createdAt
                ? formatDistanceToNow(new Date(video?.createdAt), {
                    addSuffix: true,
                  })
                : ""}
            </Info>
          </Texts>
          {isHistoryPageCard ? (
            <>
              <Box
                sx={{
                  zIndex: 1000,
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <Tooltip title="Remove Video">
                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDelete();
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          ) : undefined}
        </Details>
      </Container>
    </Link>
  );
};

export default memo(Card);
