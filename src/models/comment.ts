export interface Comment {
  userId: string;
  _id: string;
  videoId: string;
  comment: string;
  likes: string[];
  dislikes: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse {
  comments: Array<Comment>;
  success: boolean;
  message: string;
  status: number;
}
