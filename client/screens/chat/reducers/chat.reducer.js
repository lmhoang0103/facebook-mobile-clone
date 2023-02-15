import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isEmpty } from 'lodash';
import {
    getChats,
    getMessages,
    getMessagesByFriend,
} from '../../../services/chat.api';
import { getUserName } from '../../../utilities/User';

const initialState = {
    chatList: [],
    messageList: [],
    isLoading: false,
    filter: '',
    selectedChatDetail: {},
};

export const fetchChatList = createAsyncThunk(
    'chat/fetchChatList',
    async () => {
        return await getChats();
    },
);

export const fetchMessageList = createAsyncThunk(
    'chat/fetchMessageList',
    async (chatId) => {
        return await getMessages(chatId);
    },
);

export const fetchMessageListByFriend = createAsyncThunk(
    'chat/fetchMessageListByFriend',
    async (friendId) => {
        return await getMessagesByFriend(friendId);
    },
);

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setFilter: (state, action) => {
            state.filter = action.payload;
        },
        setSelectedChatDetail: (state, action) => {
            state.selectedChatDetail = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchChatList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchChatList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.chatList = action.payload?.data || [];
        });
        builder.addCase(fetchMessageList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMessageList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messageList = action.payload?.data || [];
        });
        builder.addCase(fetchMessageListByFriend.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchMessageListByFriend.fulfilled, (state, action) => {
            state.isLoading = false;
            state.messageList = action.payload?.data || [];
        });
    },
});

export const { setFilter, setSelectedChatDetail } = chatSlice.actions;

export const selectChatList = (state) =>
    isEmpty(state.chat.filter)
        ? state.chat.chatList
        : state.chat.chatList.filter((chat) => {
              const regex = new RegExp(state.chat.filter, 'i');
              return regex.test(getUserName(chat?.friend));
          });
export const selectMessageList = (state) => state.chat.messageList;
export const selectIsLoading = (state) => state.chat.isLoading;
export const selectSelectedChatDetail = (state) =>
    state.chat.selectedChatDetail;

export default chatSlice.reducer;
