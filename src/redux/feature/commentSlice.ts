import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";

interface Comment{
    snippet:{
        topLevelComment:{
            snippet:string;
        }
    }
}

interface CommentsState{
    loading:boolean;
    comments: Comment[] | null;
    error?:string;
}

const commentInitialState : CommentsState = {
    loading: true,
    comments: null
}

export const getCommentsOfVideoById = createAsyncThunk(
    "comment/getCommentsOfVideoById",
    async(id:string,{dispatch,getState}) => {
        try{
            const {data} = await request("/commentThreads",{
                params:{
                    part:"snippet",
                    videoId:id
                }
            })
            dispatch(commentListRequest())
        }catch(error){

        }
    }
)

const commentSlice = createSlice({
    name:"comment",
    initialState:commentInitialState,
    reducers:{
        commentListRequest:(state) => {
            state.loading = true;
        },
        commentListSuccess:(state, action) => {
            state.loading = false;
            state.comments = action.payload;

        },
        commentListFail : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
});

export const {
    commentListRequest,
    commentListSuccess,
    commentListFail
} = commentSlice.actions;

export const commentSliceReducer = commentSlice.reducer; 
