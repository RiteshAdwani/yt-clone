
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";
import { RootState } from "../store/store";

// Define the state interfaces for homeVideos and selectedVideo
export interface HomeVideosState {
  videos: Video[];
  loading: boolean;
  nextPageToken: string | null;
  activeCategory: string;
  error?: string;
}

export interface SelectedVideoState {
  selectedVideo: Video | null;
  loading: boolean;
  error?: string;
}

// Define the shared interface for Video
export interface Video {
  id: string | { videoId: string };
  snippet: {
    channelId: string;
    channelTitle: string;
    title: string;
    publishedAt: string;
    description: string;
    thumbnails: {
      default:{
        url:string;
      }
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    subscriberCount:string;
  };
  contentDetails: {
    videoId: string;
  };
  channelScreen?: boolean;
}

// Define the initial states for homeVideos and selectedVideo
const initialHomeVideosState: HomeVideosState = {
  videos: [],
  loading: false,
  nextPageToken: null,
  activeCategory: "All",
};

const initialSelectedVideoState: SelectedVideoState = {
  selectedVideo: null,
  loading: false,
};

// Define separate async thunks for homeVideos and selectedVideo
export const getPopularVideos = createAsyncThunk(
  "homeVideos/getPopularVideos",
  async (_, { getState, dispatch }) => {
    try {
      dispatch(homeVideosRequest());
      const { data } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          chart: "mostPopular",
          regionCode: "IN",
          maxResults: 20,
          pageToken: (getState() as RootState).homeVideos.nextPageToken,
        },
      });
      dispatch(
        homeVideosSuccess({
          videos: data.items,
          nextPageToken: data.nextPageToken,
          category: "All",
        })
      );
      console.log(data);
      console.log(data.nextPageToken);
      
    } catch (error) {
      console.log(error);
      dispatch(homeVideosFail((error as Error).message));
    }
  }
);

export const getVideosByCategory = createAsyncThunk(
  "homeVideos/getVideosByCategory",
  async (keyword: string, { getState, dispatch }) => {
    try {
      dispatch(homeVideosRequest());
      const { data } = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 20,
          pageToken: (getState() as RootState).homeVideos.nextPageToken,
          q: keyword,
          type: "video",
        },
      });

      dispatch(
        homeVideosSuccess({
          videos: data.items,
          nextPageToken: data.nextPageToken,
          category: keyword,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(homeVideosFail((error as Error).message));
    }
  }
);

export const getVideosById = createAsyncThunk(
  "selectedVideo/getVideosById",
  async (id: string, { dispatch }) => {
    try {
      dispatch(selectedVideoRequest());
      const { data } = await request("/videos", {
        params: {
          part: "snippet,statistics",
          id: id,
        },
      });
      dispatch(selectedVideoSuccess(data.items[0]));
      console.log(data);
      
    } catch (error) {
      console.log(error);
      dispatch(selectedVideoFail(error));
    }
  }
);

// Create separate slices for homeVideos and selectedVideo
const homeVideosSlice = createSlice({
  name: "homeVideos",
  initialState: initialHomeVideosState,
  reducers: {
    homeVideosRequest: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    homeVideosSuccess: (state, action) => {
      const { videos, nextPageToken, category } = action.payload;
      if (state.activeCategory === category) {
        const existingVideoIds = state.videos.map((video) =>
          typeof video.id === "string" ? video.id : video.id.videoId
        );
        const newVideos = videos.filter(
          (video : Video) =>
            typeof video.id === "string"
              ? !existingVideoIds.includes(video.id)
              : !existingVideoIds.includes(video.id.videoId)
        );
        state.videos.push(...newVideos);
      } else {
        state.videos = videos;
        state.activeCategory = category;
      }
      state.loading = false;
      state.nextPageToken = nextPageToken;
    },
    
    homeVideosFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const selectedVideoSlice = createSlice({
  name: "selectedVideo",
  initialState: initialSelectedVideoState,
  reducers: {
    selectedVideoRequest: (state) => {
      state.loading = true;
      state.selectedVideo = null;
    },
    selectedVideoSuccess: (state, action) => {
      state.loading = false;
      state.selectedVideo = action.payload;
    },
    selectedVideoFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Extract the actions and reducer for each slice
export const {
  homeVideosRequest,
  homeVideosSuccess,
  homeVideosFail,
} = homeVideosSlice.actions;

export const {
  selectedVideoRequest,
  selectedVideoSuccess,
  selectedVideoFail,
} = selectedVideoSlice.actions;

export const homeVideosReducer = homeVideosSlice.reducer;
export const selectedVideoReducer = selectedVideoSlice.reducer;

export default {
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
};
