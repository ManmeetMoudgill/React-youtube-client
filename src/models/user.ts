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

export interface UserResponse {
  user: User;
  status: number;
  message: string;
  success: boolean;
}
