import { User } from "./user";
import { CustomSuccessResponse } from "./user";
export interface Video extends CustomUser {
  _id: string;
  userId: string;
  title: string;
  description: string;
  imgUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  quantityLikes: number;
  quantityDislikes: number;
  likes: string[];
  dislikes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CustomUser {
  user: User;
}

export interface VideosResponse extends CustomSuccessResponse {
  videos: Array<Video>;
}

export interface VideoResponse extends CustomSuccessResponse {
  data: VideoType;
}

export interface VideoType extends CustomUser {
  video: Video;
}

export interface VideoHistoryResponseType extends CustomSuccessResponse {
  videosHistory: Array<SingleVideoHistoryType>;
}

export interface SingleVideoHistoryType {
  _id: string;
  video: Video;
  userId: string;
  watchedAt: string;
}
