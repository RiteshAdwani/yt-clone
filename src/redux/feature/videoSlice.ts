import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";
import { ChannelVideosState, HomeVideosState, LikedVideosState, RelatedVideosState, SearchVideosState, SelectedVideoState, Video } from "../../utils/types";
import { RootState } from "../store/store";

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

const initialRelatedVideosState: RelatedVideosState = {
  videos: [],
  loading: true,
};

const initialSearchVideosState: SearchVideosState = {
  videos: [],
  loading: false,
};

const initialChannelVideosState: ChannelVideosState = {
  videos: [],
  loading: true,
};

const initialLikedVideosState: LikedVideosState = {
  videos: [],
  loading: true,
}

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
    } catch (error) {
      console.log(error);
      dispatch(selectedVideoFail(error));
    }
  }
);

export const getRelatedVideos = createAsyncThunk(
  "relatedVideos/getRelatedVideos",
  async (id: string, { dispatch }) => {
    try {
      dispatch(relatedVideosRequest());
      const { data } = await request("/search", {
        params: {
          part: "snippet",
          relatedToVideoId: id,
          maxResults: 15,
          type: "video",
        },
      });
      dispatch(relatedVideosSuccess(data.items));
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(relatedVideosFail(error.response.data.message));
    }
  }
);

export const getVideosBySearch = createAsyncThunk(
  "searchVideos/getVideosBySearch",
  async (keyword: string, { dispatch }) => {
    try {
      dispatch(searchVideosRequest());
      const { data } = await request("/search", {
        params: {
          part: "snippet",
          maxResults: 30,
          q: keyword,
          type: "video,channel",
        },
      });
      console.log(data);

      dispatch(searchVideosSuccess(data.items));
    } catch (error) {
      console.log(error);
      dispatch(searchVideosFail((error as Error).message));
    }
  }
);

export const getVideosByChannel = createAsyncThunk(
  "channelVideos/getVideosByChannel",
  async (id: string, { dispatch }) => {
    try {
      dispatch(channelVideosRequest());
      const {
        data: { items },
      } = await request("/channels", {
        params: {
          part: "contentDetails",
          id: id,
        },
      });
      const uploadPlaylistId = items[0].contentDetails.relatedPlaylists.uploads;

      const { data } = await request("/playlistItems", {
        params: {
          part: "contentDetails,snippet",
          playlistId: uploadPlaylistId,
          maxResults: 30,
        },
      });
      dispatch(channelVideosSuccess(data.items));
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(channelVideosFail(error.response.data));
    }
  }
);

export const getLikedVideos = createAsyncThunk(
  "likedVideos/getLikedVideos",
  async (_, { dispatch,getState }) => {
    try {
      dispatch(likedVideosRequest());
      const { data } = await request("/videos", {
        params: {
          part: "snippet,contentDetails,statistics",
          maxResults: 20,
          type: "video",
          myRating:"like"
        },
        headers: {
          Authorization: `Bearer ${(getState() as RootState).auth.accessToken}`,
        },
      });
      dispatch(likedVideosSuccess(data.items));
      console.log(data.items);
    } catch (error: any) {
      console.log(error.response.data.message);
      dispatch(likedVideosFail(error.response.data.message));
    }
  }
);

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
          typeof video.id === "string"
            ? video.id
            : "videoId" in video.id
            ? video.id.videoId
            : video.id.channelId
        );
        const newVideos = videos.filter((video: Video) => {
          if (typeof video.id === "string") {
            return !existingVideoIds.includes(video.id);
          } else {
            if ("videoId" in video.id) {
              return !existingVideoIds.includes(video.id.videoId);
            } else {
              return !existingVideoIds.includes(video.id.channelId);
            }
          }
        });

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

const relatedVideosSlice = createSlice({
  name: "relatedVideos",
  initialState: initialRelatedVideosState,
  reducers: {
    relatedVideosRequest: (state) => {
      state.loading = true;
    },
    relatedVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    relatedVideosFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const searchVideosSlice = createSlice({
  name: "searchVideos",
  initialState: initialSearchVideosState,
  reducers: {
    searchVideosRequest: (state) => {
      state.loading = true;
    },
    searchVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
      console.log(state.videos.length);
    },
    searchVideosFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const channelVideosSlice = createSlice({
  name: "channelVideos",
  initialState: initialChannelVideosState,
  reducers: {
    channelVideosRequest: (state) => {
      state.loading = true;
    },
    channelVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    channelVideosFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const likedVideosSlice = createSlice({
  name: "likedVideos",
  initialState: initialLikedVideosState,
  reducers: {
    likedVideosRequest: (state) => {
      state.loading = true;
    },
    likedVideosSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    likedVideosFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { homeVideosRequest, homeVideosSuccess, homeVideosFail } =
  homeVideosSlice.actions;

export const { selectedVideoRequest, selectedVideoSuccess, selectedVideoFail } =
  selectedVideoSlice.actions;

export const { relatedVideosRequest, relatedVideosSuccess, relatedVideosFail } =
  relatedVideosSlice.actions;

export const { searchVideosRequest, searchVideosSuccess, searchVideosFail } =
  searchVideosSlice.actions;

export const { channelVideosRequest, channelVideosSuccess, channelVideosFail } =
  channelVideosSlice.actions;

export const { likedVideosRequest, likedVideosSuccess, likedVideosFail } =
  likedVideosSlice.actions;

export const homeVideosReducer = homeVideosSlice.reducer;
export const selectedVideoReducer = selectedVideoSlice.reducer;
export const relatedVideosReducer = relatedVideosSlice.reducer;
export const searchVideosReducer = searchVideosSlice.reducer;
export const channelVideosReducer = channelVideosSlice.reducer;
export const likedVideosReducer = likedVideosSlice.reducer;


export default {
  homeVideos: homeVideosReducer,
  selectedVideo: selectedVideoReducer,
  relatedVideos: relatedVideosReducer,
  searchVideos: searchVideosReducer,
  channelVideos: channelVideosReducer,
  likedVideos: likedVideosReducer,
};
