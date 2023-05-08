import React, { memo, useEffect, useMemo, useCallback } from "react";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
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
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
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
  ChannelInfoLeftContainer,
  ChannelInfoRightContainer,
} from "./styled-components/Video";
import { CustomSuccessResponse } from "../models/user";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ErrorBoundary from "../components/ErrorBoundary";
import ErrorFallback from "../components/ErrorFallBack";
interface LikeDislikeProps {
  isLike: boolean;
}

const VideoPage = () => {
  const params = useParams();
  const user = useSelector((state: RootState) => state?.user);
  const result = useSelector((state: RootState) => state?.video);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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

  const {
    makeCall: getVideo,
    result: videoResult,
    error,
  } = useApi<VideoResponse>({
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

  const videoUrl = useMemo(() => {
    return `http://${
      process.env.MODE === "development"
        ? process.env.REACT_API_DEV_URL
        : process.env.REACT_API_PROD_URL
    }/video/detail/${result?.data?.video?._id}`;
  }, [result?.data?.video?._id]);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      navigate("/404");
    }
  }, [error, navigate]);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {videoResult && !error && (
        <>
          <Container>
            <Content>
              <VideoWrapper>
                <VideoFrame src={videoResult?.data?.video?.videoUrl} controls />
              </VideoWrapper>
              <Title></Title>
              <Details>
                <Info>
                  {videoResult?.data?.video?.views} views •{" "}
                  {videoResult?.data?.video?.createdAt
                    ? formatDistanceToNow(
                        new Date(videoResult?.data?.video?.createdAt),
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

                  <Button
                    id="share-positioned-button"
                    aria-controls={open ? "share-positioned-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                  >
                    <ReplyOutlinedIcon /> Share
                  </Button>
                  <Menu
                    id="share-positioned-menu"
                    aria-labelledby="share-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "left",
                    }}
                  >
                    <MenuItem>
                      <EmailShareButton url={videoUrl}>
                        Share via email
                      </EmailShareButton>
                    </MenuItem>
                    <MenuItem>
                      <WhatsappShareButton url={videoUrl}>
                        Share via whatsapp
                      </WhatsappShareButton>
                    </MenuItem>
                    <MenuItem>
                      <FacebookShareButton url={videoUrl}>
                        Shre via facebook
                      </FacebookShareButton>
                    </MenuItem>
                    <MenuItem>
                      <TelegramShareButton url={videoUrl}>
                        Shre via telegram
                      </TelegramShareButton>
                    </MenuItem>
                    <MenuItem>
                      <LinkedinShareButton url={videoUrl}>
                        Shre via linkedin
                      </LinkedinShareButton>
                    </MenuItem>
                    <MenuItem>
                      <TwitterShareButton url={videoUrl}>
                        Shre via twitter
                      </TwitterShareButton>
                    </MenuItem>
                  </Menu>
                </Buttons>
              </Details>
              <Hr />
              <Channel>
                <ChannelInfo>
                  <ChannelInfoLeftContainer>
                    <Image src="https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo" />
                    <ChannelDetail>
                      <ChannelName>{videoResult?.data?.user?.name}</ChannelName>
                      <ChannelCounter>
                        {videoResult?.data?.user?.subscribers} subscribers
                      </ChannelCounter>
                    </ChannelDetail>
                  </ChannelInfoLeftContainer>
                  <ChannelInfoRightContainer>
                    {user?.user?._id !== videoResult?.data?.user?._id ? (
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
                  </ChannelInfoRightContainer>
                </ChannelInfo>
                <Description>
                  {videoResult?.data?.video?.description}
                </Description>
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
                currrentVideoId={videoResult?.data?.video?._id}
                tags={videoResult?.data?.video?.tags}
              />
            </ReccomendationContainer>
          </Container>
        </>
      )}
    </ErrorBoundary>
  );
};

export default memo(VideoPage);
