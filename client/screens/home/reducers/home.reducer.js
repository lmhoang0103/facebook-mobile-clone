import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    actionLikePost,
    createPost,
    getPosts,
} from '../../../services/post.api';

const initialState = {
    postList: [],
    isLoading: false,
};

export const fetchPostList = createAsyncThunk(
    'home/fetchPostList',
    async (userId) => {
        return await getPosts(userId);
    },
);

export const createNewPost = createAsyncThunk(
    'home/createNewPost',
    async (body) => {
        return await createPost(body);
    },
);

export const likePost = createAsyncThunk('home/likePost', async (postId) => {
    return await actionLikePost(postId);
});

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchPostList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.postList = action.payload?.data || [];
        });
    },
});

export const selectPostList = (state) => state.home.postList;
export const selectIsLoading = (state) => state.home.isLoading;

export default homeSlice.reducer;
