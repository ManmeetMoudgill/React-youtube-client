export interface User {
  _id: string;
  name: string;
  email: string;
  subscribers: number;
  subscribedUsers: string[];
  img: string;
  createdAt: string;
  updatedAt: string;
  isGoogleAuth?: boolean;
}

export interface UserResponse extends CustomResponse {
  user: User;
}

export interface CustomResponse extends CustomSuccessResponse {
  message: string;
}

export interface CustomSuccessResponse {
  success: boolean;
  status: number;
}
