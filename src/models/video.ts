import { User } from "./user";

export interface Video {
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
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface VideosResponse {
  success: boolean;
  status: number;
  videos: Array<Video>;
}

export interface VideoResponse {
  success: boolean;
  status: number;
  data: VideoType;
}

export interface VideoType {
  user: User;
  video: Video;
}

export interface VideoHistoryResponseType {
  success: boolean;
  status: number;
  videosHistory: Array<SingleVideoHistoryType>;
}

export interface SingleVideoHistoryType {
  _id: string;
  video: Video;
  userId: string;
  watchedAt: string;
}
