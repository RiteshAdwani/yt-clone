import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";
import { RootState } from "../store/store";

interface Comment {
  snippet: {
    topLevelComment: {
      snippet: {
        authorDisplayName: string;
        authorProfileImageUrl: string;
        textDisplay: string;
        publishedAt: string;
      }
    };
  };
}

interface CommentListState {
  loading: boolean;
  comments: Comment[] | null;
  error?: string;
}

const commentListInitialState: CommentListState = {
  loading: true,
  comments: null,
};

export const getCommentsOfVideoById = createAsyncThunk(
  "commentList/getCommentsOfVideoById",
  async (id: string, { dispatch }) => {
    try {
      dispatch(commentListRequest());
      const { data } = await request("/commentThreads", {
        params: {
          part: "snippet",
          videoId: id,
        },
      });  
      console.log(data)
      dispatch(commentListSuccess(data.items))  
    }catch (error) {
      console.log(error);
      dispatch(commentListFail(error));
    }
  }
);


export const addComment = createAsyncThunk(
  "commentList/addComment",
  async ({ id, text }: { id: string; text: string }, { dispatch,getState }) => {
    try {
      const obj = {
        snippet: {
          videoId: id,
          topLevelComment: {
            snippet: {
              textOriginal:text
            }
          }
        }
      }
      await request.post("/commentThreads",obj, {
        params: {
          part: "snippet",
        },
        headers: {
          Authorization:`Bearer ${(getState() as RootState).auth.accessToken}`
        }
      });   
      dispatch(addCommentSuccess());
      setTimeout(() => dispatch(getCommentsOfVideoById(id)), 3000);
    }catch (error:any) {
      console.log(error);
      dispatch(addCommentFail(error));
    }
  }
);

const commentSlice = createSlice({
  name: "commentList",
  initialState: commentListInitialState,
  reducers: {
    commentListRequest: (state) => {
      state.loading = true;
    },
    commentListSuccess: (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    },
    commentListFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addCommentSuccess: (state) => {
      state.loading = false;
    },
    addCommentFail: (state) => {
      state.loading = false;
    }
  },
});


export const { commentListRequest, commentListSuccess, commentListFail, addCommentSuccess,addCommentFail } =
  commentSlice.actions;

export const commentReducer = commentSlice.reducer;
