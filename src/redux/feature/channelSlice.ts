import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";
import { RootState } from "../store/store";
import { ChannelState,ChannelSubscriptionsState } from "../../utils/types";
const initialChannelState: ChannelState = {
  loading: true,
  channel: null,
  subscriptionStatus: false,
};

const initialChannelSubscriptionsState: ChannelSubscriptionsState = {
  videos: [],
  loading: false,
};

export const getChannelDetails = createAsyncThunk(
  "channel/getChannelDetails",
  async (id: string, { dispatch }) => {
    try {
      dispatch(channelDetailsRequest());
      const { data } = await request("/channels", {
        params: {
          part: "snippet,statistics,contentDetails",
          id,
        },
      });
      dispatch(channelDetailsSuccess(data.items[0]));
    } catch (error:any) {
      console.log(error.response.data);
      dispatch(channelDetailsFail(error.response.data));
    }
  }
);

export const checkSubscriptionStatus = createAsyncThunk(
  "channel/checkSubscriptionStatus",
  async (id: string, { dispatch, getState }) => {
    try {
      const { data } = await request("/subscriptions", {
        params: {
          part: "snippet",
          forChannelId: id,
          mine: true,
        },
        headers: {
          Authorization: `Bearer ${(getState() as RootState).auth.accessToken}`,
        },
      });

      dispatch(setSubscriptionStatus(data.items.length !== 0));
    } catch (error: any) {
      console.log(error.response.data);
      const accessToken = (getState() as RootState).auth.accessToken;
      console.log(accessToken);
      dispatch(channelDetailsFail(error.response.data));
    }
  }
);

export const getSubscribedChannels = createAsyncThunk(
  "susbcribedChannels/getSubscribedChannels",
  async (_, { dispatch, getState }) => {
    try {
      dispatch(channelSubscriptionsRequest());
      const { data } = await request("/subscriptions", {
        params: {
          part: "snippet,contentDetails",
          mine: true,
        },
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${(getState() as RootState).auth.accessToken}`,
        },
      });

      dispatch(channelSubscriptionsSuccess(data.items));
    } catch (error: any) {
      console.log(error.response.data);
      console.log((getState() as RootState).auth.accessToken);
      dispatch(channelSubscriptionsFail(error.response.data));
    }
  }
);

const channelSlice = createSlice({
  name: "channel",
  initialState: initialChannelState,
  reducers: {
    channelDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    channelDetailsSuccess: (state, action) => {
      state.loading = false;
      state.channel = action.payload;
    },
    channelDetailsFail: (state, action) => {
      state.loading = false;
      state.channel = null;
      state.error = action.payload;
    },
    setSubscriptionStatus: (state, action) => {
      state.subscriptionStatus = action.payload;
    },
  },
});

const channelSubscriptionsSlice = createSlice({
  name: "channelSubscriptions",
  initialState: initialChannelSubscriptionsState,
  reducers: {
    channelSubscriptionsRequest: (state) => {
      state.loading = true;
    },
    channelSubscriptionsSuccess: (state, action) => {
      state.loading = false;
      state.videos = action.payload;
    },
    channelSubscriptionsFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
      console.log("Failsss");
    },
  },
});

export const {
  channelDetailsRequest,
  channelDetailsSuccess,
  channelDetailsFail,
  setSubscriptionStatus,
} = channelSlice.actions;

export const {
  channelSubscriptionsRequest,
  channelSubscriptionsSuccess,
  channelSubscriptionsFail,
} = channelSubscriptionsSlice.actions;

export const channelDetailsReducer = channelSlice.reducer;
export const channelSubscriptionsReducer = channelSubscriptionsSlice.reducer;

export default {
  channelDetails: channelDetailsReducer,
  channelSubscriptions: channelSubscriptionsReducer,
};
