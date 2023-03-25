import LazyLoad from "react-lazy-load";
import { formatDistanceToNow } from "date-fns";
import { memo } from "react";
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

  return (
    <LazyLoad>
      <Link
        to={`/video/detail/${video?._id}`}
        style={{ textDecoration: "none" }}
      >
        <Container type={type}>
          <VideoComponent
            muted
            type={type}
            src={video?.videoUrl}
            poster={video?.imgUrl}
          />

          <Details type={type} isHistoryPageCard={isHistoryPageCard}>
            <ChannelImage
              type={type}
              src={user?.img ? user?.img : "/images/user.png"}
            />

            <Texts>
              <Title>{video?.title?.slice(0, 25)}..</Title>
              {type === "sm" && user ? (
                <ChannelName>{user?.name}</ChannelName>
              ) : (
                <ChannelName>{user?.name}</ChannelName>
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
    </LazyLoad>
  );
};

export default memo(Card);
