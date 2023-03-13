import React, { memo, useEffect, useMemo, useCallback } from "react";
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
import { HTTP_RESPONSE_STATUS_CODE } from "../constants";
import {
  ReccomendationContainer,
  VideoFrame,
  VideoWrapper,
  Subscribe,
  Channel,
  ChannelCounter,
  ChannelDetail,
  ChannelInfo,
  ChannelName,
  Image,
  Hr,
  Description,
  Details,
  Info,
  Buttons,
  Button,
  Container,
  Content,
  Title,
} from "./styled-components/Video";
import { CustomSuccessResponse } from "../models/user";
interface LikeDislikeProps {
  isLike: boolean;
}

const VideoPage = () => {
  const params = useParams();
  const user = useSelector((state: RootState) => state?.user);
  const result = useSelector((state: RootState) => state?.video);
  console.log(result);
  const dispatch = useDispatch();

  const { makeCall: likeVideo } = useApi<CustomSuccessResponse>({
    url: `/users/like/${params?.id}`,
    method: "post",
  });

  const { makeCall: dislikeVideo } = useApi<CustomSuccessResponse>({
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

  const { makeCall: getVideo } = useApi<VideoResponse>({
    url: `/videos/find/${params?.id}`,
    method: "get",
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
  }, [getVideo, user?.user, params?.id, dispatch, insertVideoIntoHistory]);

  const handleLike = useCallback(async () => {
    const response = await likeVideo();
    const res = response as CustomSuccessResponse;
    if (res.success && res.status === HTTP_RESPONSE_STATUS_CODE.OK) {
      dispatch(likeVideoAction(user?.user?._id as string));
    }
  }, [dispatch, likeVideo, user?.user]);

  const handleDislike = useCallback(async () => {
    const response = await dislikeVideo();
    const res = response as CustomSuccessResponse;
    if (res.success && res.status === HTTP_RESPONSE_STATUS_CODE.OK) {
      dispatch(dislikeVideoAction(user?.user?._id as string));
    }
  }, [dispatch, dislikeVideo, user?.user]);

  const subscribeChannelFunc = useEventCallback(async () => {
    const response = await subscribeChannel();
    const res = response as CustomSuccessResponse;
    if (res.success && res.status === HTTP_RESPONSE_STATUS_CODE.OK) {
      dispatch(incrementSubscribersAction());
      dispatch(subscribeToChannelAction(result?.data?.video?.userId as string));
    }
  });

  const unSubscribeChannelFunc = useEventCallback(async () => {
    const response = await unSubscribeChannel();
    const res = response as CustomSuccessResponse;
    if (res.success && res.status === HTTP_RESPONSE_STATUS_CODE.OK) {
      dispatch(decrementSubscribersAction());
      dispatch(
        unSubscribeToChannelAction(result?.data?.video?.userId as string)
      );
    }
  });

  const haveSubscribed = useMemo(() => {
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

  const LikeDislikeComponent = useCallback(
    ({ isLike }: LikeDislikeProps): JSX.Element => {
      if (!user?.user) {
        return isLike ? (
          <ThumbUpOutlinedIcon />
        ) : (
          <ThumbDownOffAltOutlinedIcon />
        );
      }

      const hasLiked = result?.data?.video?.likes?.includes(user?.user?._id);
      const hasDisliked = result?.data?.video?.dislikes?.includes(
        user?.user?._id
      );

      if (isLike && hasLiked) {
        return <ThumbUpIcon />;
      } else if (!isLike && hasDisliked) {
        return <ThumbDownIcon />;
      }

      return isLike ? <ThumbUpOutlinedIcon /> : <ThumbDownOffAltOutlinedIcon />;
    },
    [user?.user, result?.data?.video?.likes, result?.data?.video?.dislikes]
  );

  return (
    <>
      {result?.data && result?.data !== null ? (
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
                    <LikeDislikeComponent isLike={true} />{" "}
                    {result?.data?.video?.likes?.length}
                  </Button>
                  <Button onClick={handleDislike}>
                    <LikeDislikeComponent isLike={false} />{" "}
                    {result?.data?.video?.dislikes?.length}
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
                      haveSubscribed
                        ? unSubscribeChannelFunc
                        : subscribeChannelFunc
                    }
                  >
                    {haveSubscribed ? "UNSUBSCRIBE" : "SUBSCRIBE"}
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
            <ReccomendationContainer>
              <RecommendationComponent
                currrentVideoId={result?.data?.video?._id}
                tags={result?.data?.video?.tags}
              />
            </ReccomendationContainer>
          </Container>
        </>
      ) : undefined}
    </>
  );
};

export default memo(VideoPage);
