import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../../models/user";

export interface UserState {
  user: User | null;
  error: boolean;
}

const initialState: UserState = {
  user: null,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signUpSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = false;
    },
    signUpError: (state) => {
      state.error = true;
    },
    signInSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.error = false;
    },
    signInError: (state) => {
      state.error = true;
    },
    logout: (state) => {
      state.user = null;
      state.error = false;
    },
    subscribeToChannelAction: (state, action: PayloadAction<string>) => {
      if (!state.user?.subscribedUsers.includes(action.payload)) {
        state.user?.subscribedUsers.push(action.payload);
      }
    },
    unSubscribeToChannelAction: (state, action: PayloadAction<string>) => {
      if (state.user?.subscribedUsers.includes(action.payload)) {
        state.user.subscribedUsers = state.user.subscribedUsers?.filter(
          (id) => id !== action.payload
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  signInError,
  signInSuccess,
  signUpError,
  signUpSuccess,
  logout,
  subscribeToChannelAction,
  unSubscribeToChannelAction,
} = userSlice.actions;
export default userSlice.reducer;
