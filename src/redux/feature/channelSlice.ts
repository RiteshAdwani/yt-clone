import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";
import { RootState } from "../store/store";

export interface Channel{
    id:string;
    snippet:{
        thumbnails:{
            default:{
                url:string;
            }
        }
    };
    statistics:{
        subscriberCount:string;
    }
}

interface ChannelState  {
    loading: boolean;
    channel: Channel | null;
    subscriptionStatus : boolean;
    error?: string | null;
}

const initialChannelState : ChannelState = {
    loading: true,
    channel:null,
    subscriptionStatus:false
}

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
    async (id: string, { dispatch,getState }) => {
      try {
        const { data } = await request("/subscriptions", {
          params: {
            part: "snippet",
            forChannelId:id,
            mine:true
          },
          headers:{
            Authorization : `Bearer ${(getState() as RootState).auth.accessToken}`
          }
        });
        dispatch(setSubscriptionStatus(data.items.length !== 0));
 
      } catch (error:any) {
        console.log(error.response.data);
        dispatch(channelDetailsFail(error.response.data));
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
      setSubscriptionStatus:(state,action) => {
        state.subscriptionStatus = action.payload;
      }
    },
  });

  export const {
    channelDetailsRequest,
    channelDetailsSuccess,
    channelDetailsFail,
    setSubscriptionStatus
  } = channelSlice.actions;

  export const channelDetailsReducer = channelSlice.reducer;