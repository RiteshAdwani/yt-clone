import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import authReducer from '../feature/authSlice';
import {channelSubscriptionsReducer, homeVideosReducer,relatedVideosReducer,searchVideosReducer,selectedVideoReducer} from "../feature/videoSlice";
import { channelDetailsReducer } from '../feature/channelSlice';
import { commentReducer } from '../feature/commentSlice';
const rootReducer = {
  auth: authReducer,
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  relatedVideos: relatedVideosReducer,
  channelDetails: channelDetailsReducer,
  searchVideos: searchVideosReducer,
  channelVideos:channelSubscriptionsReducer,
  comment: commentReducer,
  // Add other reducers here
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;