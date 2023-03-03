import { formatDistanceToNow } from "date-fns";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Video } from "../models/video";
import { Box, IconButton, Tooltip, useEventCallback } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useApi } from "../shell/hooks/custom-http";
import { removeFromVideoHistory } from "../shell/reudx/slicers/video";
interface ContainerProps {
  type?: string;
}
interface ImageProps {
  type?: string;
}

interface DetailsProps {
  type?: string;
  isHistoryPageCard?: boolean;
}

interface ChannelImageProps {
  type?: string;
}

const Container = styled.div<ContainerProps>`
  z-index: -1000;
  width: ${(props) => props?.type !== "sm" && "290px"};
  margin-bottom: ${(props) => (props?.type === "sm" ? "20px" : "45px")};
  cursor: pointer;
  display: ${(props) => props?.type === "sm" && "flex"};
  gap: 11px;
  &:hover {
    opacity: 0.8;
    transform: ${(props) =>
      props?.type === "sm" ? "translateX(5px)" : "translateY(-5px)"};
    transition: all 0.3s ease;
  }
`;

const Image = styled.img<ImageProps>`
  width: ${(props) => (props?.type === "sm" ? "150px" : "100%")};
  height: ${(props) => (props?.type === "sm" ? "120px" : "202px")};
  object-fit: cover;
  background-color: #999;
  border-radius: 15px;
  flex: 1;
`;

const Details = styled.div<DetailsProps>`
  display: flex;
  position: ${(props) => props?.isHistoryPageCard && "relative"};
  margin-top: ${(props) => props?.type !== "sm" && "16px"};
  gap: 12px;
  align-items: flex-start;
  flex: 1;
`;

const ChannelImage = styled.img<ChannelImageProps>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #999;
  display: ${(props) => props?.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  margin: 0px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 5px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

interface CardProps {
  type?: string;
  video?: Video;
  isHistoryPageCard?: boolean;
  id?: string;
}
const Card = ({ type, video, isHistoryPageCard, id }: CardProps) => {
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
      if (res?.status === 200 || res?.status === 201) {
        dispatch(removeFromVideoHistory(videohistoryId));
      }
    });
  });

  return (
    <Link to={`/video/${video?._id}`} style={{ textDecoration: "none" }}>
      <Container
        type={type}
        className="animate__animated animate__fadeIn animate__delay-0.5s "
      >
        <Image type={type} src={video?.imgUrl} title={video?.title} />

        <Details type={type} isHistoryPageCard={isHistoryPageCard}>
          <ChannelImage
            type={type}
            src={video?.user?.img ? video?.user?.img : "/images/userProva.jfif"}
          />
          <Texts>
            <Title>{video?.title?.slice(0, 25)}..</Title>
            <ChannelName>{video?.user?.name}</ChannelName>
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
