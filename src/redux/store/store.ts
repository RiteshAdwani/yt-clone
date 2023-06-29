import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "../feature/authSlice";
import {
  channelVideosReducer,
  homeVideosReducer,
  likedVideosReducer,
  relatedVideosReducer,
  searchVideosReducer,
  selectedVideoReducer,
} from "../feature/videoSlice";
import {
  channelDetailsReducer,
  channelSubscriptionsReducer,
} from "../feature/channelSlice";
import { commentReducer } from "../feature/commentSlice";
const rootReducer = {
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  relatedVideos: relatedVideosReducer,
  channelDetails: channelDetailsReducer,
  channelVideos: channelVideosReducer,
  searchVideos: searchVideosReducer,
  channelSubscriptions: channelSubscriptionsReducer,
  likedVideos: likedVideosReducer,
  comment: commentReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
// export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
