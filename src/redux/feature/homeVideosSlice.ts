import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";
import { RootState } from "../store/store";

export interface Video {
  id: string | { videoId: string };
  snippet: {
    channelId: string;
    channelTitle: string;
    title: string;
    publishedAt: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
  };
  contentDetails: {
    videoId: string;
  };
  channelScreen?: boolean;
}

export interface HomeVideosState {
  videos: Video[];
  selectedVideo: Video | null;
  loading: boolean;
  nextPageToken: string | null;
  activeCategory: string;
  error?: string;
}

const initialState: HomeVideosState = {
  videos: [],
  selectedVideo:null,
  loading: false,
  nextPageToken: null,
  activeCategory: "All",
};

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
  "homeVideos/getVideosById",
  async (id:string,{dispatch}) => {
    try {
      dispatch(selectedVideoRequest());
      const { data } = await request("/videos", {
        params: {
          part: "snippet,statistics",
          id: id
        }
      });
      dispatch(selectedVideoSuccess(data.items[0]));
    } catch (error){
      console.log(error);
      dispatch(selectedVideoFail(error));
    }
  }
)

const homeVideosSlice = createSlice({
  name: "homeVideos",
  initialState,
  reducers: {
    homeVideosRequest: (state) => {
      state.loading = true;
      state.error = undefined;
    },
    homeVideosSuccess: (state, action) => {
      const { videos, nextPageToken, category } = action.payload;
      state.videos =
        state.activeCategory === category
          ? [...state.videos, ...videos]
          : videos;
      state.loading = false;
      state.nextPageToken = nextPageToken;
    },
    homeVideosFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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
    }
  },
});

export const {
  homeVideosRequest,
  homeVideosSuccess,
  homeVideosFail,
  selectedVideoRequest,
  selectedVideoSuccess,
  selectedVideoFail
} = homeVideosSlice.actions;

export default homeVideosSlice.reducer;
