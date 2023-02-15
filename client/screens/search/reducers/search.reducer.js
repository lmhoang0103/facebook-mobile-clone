import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { search } from '../../../services/search.api';

const initialState = {
    friendList: [],
    peopleList: [],
    messageList: [],
    postList: [],
    isLoading: false,
};

export const fetchSearchData = createAsyncThunk(
    'search/fetchSearchData',
    async (keyword) => {
        return await search(keyword);
    },
);

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSearchData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSearchData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendList = action.payload?.data?.friends || [];
            state.peopleList = action.payload?.data?.people || [];
            state.messageList = action.payload?.data?.messages || [];
            state.postList = action.payload?.data?.posts || [];
        });
    },
});

export const selectSearchState = (state) => state.search;

export default searchSlice.reducer;
