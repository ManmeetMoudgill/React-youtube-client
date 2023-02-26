import { SingleVideoHistoryType, VideoType } from "../../../models/video";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface VideoState {
  data: VideoType | null;
  videoHistory: Array<SingleVideoHistoryType> | [];
  error: boolean;
}

const initialState: VideoState = {
  data: null,
  videoHistory: [],
  error: false,
};

export const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    fetchVideo: (state, action: PayloadAction<VideoType>) => {
      state.data = action.payload;
      state.error = false;
    },
    fetchVideoError: (state) => {
      state.error = true;
    },
    likeVideoAction: (state, action: PayloadAction<string>) => {
      if (!state.data?.video.likes.includes(action.payload)) {
        state.data?.video.likes.push(action.payload);
        state.data?.video.dislikes?.splice(
          state.data?.video.dislikes?.findIndex((id) => id === action.payload),
          1
        );
        //remove the dislike from the array
      }
    },
    dislikeVideoAction: (state, action: PayloadAction<string>) => {
      if (!state.data?.video.dislikes.includes(action.payload)) {
        state.data?.video.dislikes.push(action.payload);

        state.data?.video.likes?.splice(
          state.data?.video.likes?.findIndex((id) => id === action.payload),
          1
        );
      }
    },
    decrementSubscribersAction: (state) => {
      if (state.data) {
        state.data.user.subscribers = state.data?.user.subscribers - 1;
      }
    },
    incrementSubscribersAction: (state) => {
      if (state.data) {
        state.data.user.subscribers = state.data?.user.subscribers + 1;
      }
    },
    addToVideoHistory: (
      state,
      action: PayloadAction<Array<SingleVideoHistoryType>>
    ) => {
      state.videoHistory = action.payload;
    },
    removeFromVideoHistory: (state, action: PayloadAction<string>) => {
      state.videoHistory = state.videoHistory.filter(
        (video) => video._id !== action.payload
      );
    },
    incrementViewsAction: (state) => {
      if (state.data) {
        state.data.video.views = state.data.video.views + 1;
      }
    },
  },
});

export const {
  fetchVideo,
  fetchVideoError,
  likeVideoAction,
  dislikeVideoAction,
  decrementSubscribersAction,
  incrementSubscribersAction,
  addToVideoHistory,
  incrementViewsAction,
  removeFromVideoHistory,
} = videoSlice.actions;

export default videoSlice.reducer;
