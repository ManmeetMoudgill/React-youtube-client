import React, { memo, useEffect, useMemo } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { formatDistanceToNow } from "date-fns";

import { useParams } from "react-router-dom";
import { VideoResponse } from "../models/video";
import { useApi } from "../shell/hooks/custom-http";
import { useSelector } from "react-redux";
import { RootState } from "../shell/reudx";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch } from "react-redux";
import {
  decrementSubscribersAction,
  dislikeVideoAction,
  fetchVideo,
  incrementSubscribersAction,
  incrementViewsAction,
  likeVideoAction,
} from "../shell/reudx/slicers/video";
import { useEventCallback } from "@mui/material";
import {
  subscribeToChannelAction,
  unSubscribeToChannelAction,
} from "../shell/reudx/slicers/user";
import { CommentsResponse } from "../models/comment";
import CommentComponent from "../components/Comment";
import RecommendationComponent from "../components/Recommendation";
const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  max-height: 500px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const params = useParams();
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const result = useSelector((state: RootState) => state.video);

  const { makeCall: getVideo } = useApi<VideoResponse>({
    url: `/videos/find/${params?.id}`,
    method: "get",
  });

  const { makeCall: likeVideo } = useApi({
    url: `/users/like/${params?.id}`,
    method: "post",
  });

  const { makeCall: dislikeVideo } = useApi({
    url: `/users/dislike/${params?.id}`,
    method: "post",
  });

  const { makeCall: subscribeChannel } = useApi({
    url: `/users/sub/${result?.data?.video?.userId}`,
    method: "put",
  });

  const { makeCall: unSubscribeChannel } = useApi({
    url: `/users/unsub/${result?.data?.video?.userId}`,
    method: "put",
  });

  const { makeCall: insertVideoIntoHistory } = useApi({
    url: `/users/videosHistory`,
    method: "post",
  });

  useEffect(() => {
    getVideo().then((data) => {
      const video = (data as VideoResponse)?.data;
      if (video) {
        dispatch(fetchVideo(video));
        dispatch(incrementViewsAction());
        if (user?.user) {
          const data = {
            userId: user?.user?._id,
            videoId: video?.video?._id,
            watchedAt: new Date().toISOString(),
          };
          insertVideoIntoHistory({
            data: data,
          });
        }
      }
    });
  }, [dispatch, getVideo, insertVideoIntoHistory, user?.user, params?.id]);

  const handleLike = useEventCallback(async () => {
    likeVideo().then((res: { success: boolean; status: number }) => {
      if (res.success && res.status === 200) {
        dispatch(likeVideoAction(user?.user?._id as string));
      }
    });
  });

  const handleDislike = useEventCallback(async () => {
    dislikeVideo().then((res: { success: boolean; status: number }) => {
      if (res.success && res.status === 200) {
        dispatch(dislikeVideoAction(user?.user?._id as string));
      }
    });
  });

  const LikeComponent = useEventCallback((): JSX.Element => {
    if (!user?.user) {
      return <ThumbUpOutlinedIcon />;
    }

    if (result?.data?.video?.likes?.includes(user?.user?._id)) {
      return <ThumbUpIcon />;
    }
    return <ThumbUpOutlinedIcon />;
  });

  const DislikeComponent = useEventCallback((): JSX.Element => {
    if (!user?.user) {
      return <ThumbDownOffAltOutlinedIcon />;
    }

    if (result?.data?.video?.dislikes?.includes(user?.user?._id)) {
      return <ThumbDownIcon />;
    }
    return <ThumbDownOffAltOutlinedIcon />;
  });

  const subscribeChannelFunc = useEventCallback(async () => {
    subscribeChannel().then(() => {
      dispatch(incrementSubscribersAction());
      dispatch(subscribeToChannelAction(result?.data?.video?.userId as string));
    });
  });

  const unSubscribeChannelFunc = useEventCallback(async () => {
    unSubscribeChannel().then(() => {
      dispatch(decrementSubscribersAction());
      dispatch(
        unSubscribeToChannelAction(result?.data?.video?.userId as string)
      );
    });
  });

  const haveISubscribed = useMemo(() => {
    if (!user?.user) return false;

    return (
      result?.data?.video?.userId &&
      user?.user?.subscribedUsers?.includes(result?.data?.video?.userId)
    );
  }, [result?.data?.video?.userId, user?.user]);

  const { result: comments } = useApi<CommentsResponse>({
    url: `/comments/${params?.id}`,
    method: "get",
    onBootstrap: true,
  });

  return (
    <>
      {result?.data ? (
        <>
          <Container>
            <Content>
              <VideoWrapper>
                <VideoFrame src={result?.data?.video?.videoUrl} controls />
              </VideoWrapper>
              <Title></Title>
              <Details>
                <Info>
                  {result?.data?.video?.views} views •{" "}
                  {result?.data?.video?.createdAt
                    ? formatDistanceToNow(
                        new Date(result?.data?.video?.createdAt),
                        {
                          addSuffix: true,
                        }
                      )
                    : ""}
                </Info>
                <Buttons>
                  <Button onClick={handleLike}>
                    <LikeComponent /> {result?.data?.video?.likes?.length}
                  </Button>
                  <Button onClick={handleDislike}>
                    <DislikeComponent /> {result?.data?.video?.dislikes?.length}
                  </Button>
                  <Button>
                    <ReplyOutlinedIcon /> Share
                  </Button>
                  <Button>
                    <AddTaskOutlinedIcon /> Save
                  </Button>
                </Buttons>
              </Details>
              <Hr />
              <Channel>
                <ChannelInfo>
                  <Image src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
                  <ChannelDetail>
                    <ChannelName>{result?.data?.user?.name}</ChannelName>
                    <ChannelCounter>
                      {result?.data?.user?.subscribers} subscribers
                    </ChannelCounter>
                    <Description>
                      {result?.data?.video?.description}
                    </Description>
                  </ChannelDetail>
                </ChannelInfo>
                {user?.user?._id !== result?.data?.user?._id ? (
                  <Subscribe
                    onClick={
                      haveISubscribed
                        ? unSubscribeChannelFunc
                        : subscribeChannelFunc
                    }
                  >
                    {haveISubscribed ? "UNSUBSCRIBE" : "SUBSCRIBE"}
                  </Subscribe>
                ) : undefined}
              </Channel>
              <Hr />
              {comments?.comments?.map((comment) => {
                return (
                  <CommentComponent comment={comment} key={comment?._id} />
                );
              })}
            </Content>
            <RecommendationComponent
              currrentVideoId={result?.data?.video?._id}
              tags={result?.data?.video?.tags}
            />
          </Container>
        </>
      ) : undefined}
    </>
  );
};

export default memo(Video);
