import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    acceptRequest,
    cancelRequest,
    getFriendProfile,
    getFriendStatus,
    getListRequest,
    getRequestedFriends,
    listFriend,
    removeFriend,
    sendFriendRequest,
    blockUserDiary,
    listBlockUser,
} from '@/services/friend.api';
import { status } from '@constants';

const initialState = {
    friendList: [],
    sentList: [],
    receivedList: [],
    blockList: [],
    targetUser: {},
    isLoading: false,
};

export const sendRequest = createAsyncThunk(
    'friend/sendFriendRequest',
    async (body) => {
        return await sendFriendRequest(body);
    },
);

export const getRequestedFriend = createAsyncThunk(
    'friend/getRequestedFriends',
    async (body) => {
        return await getRequestedFriends(body);
    },
);

//1: ket ban 2: huy loi moi
export const acceptRequestFriend = createAsyncThunk(
    'friend/accept',
    async (body) => {
        return await acceptRequest(body);
    },
);

export const cancelRequestFriend = createAsyncThunk(
    'friend/cancel',
    async (body) => {
        return await cancelRequest(body);
    },
);

export const deleteFriend = createAsyncThunk('friend/remove', async (body) => {
    return await removeFriend(body);
});

export const getListFriends = createAsyncThunk('friend/status', async () => {
    return await listFriend();
});

export const getStatusFriend = createAsyncThunk(
    'friend/getListFriends',
    async (params) => {
        return await getFriendStatus(params);
    },
);

export const listRequest = createAsyncThunk('friend/listRequest', async () => {
    return await getListRequest();
});

export const getUserProfile = createAsyncThunk(
    'friend/profile',
    async (params) => {
        return await getFriendProfile(params);
    },
);

export const blockUserDiarySlice = createAsyncThunk(
    'friend/block',
    async (body) => {
        return await blockUserDiary(body);
    },
);

export const blockList = createAsyncThunk('friend/block_user', async () => {
    return await listBlockUser();
});

export const friendSlice = createSlice({
    name: 'friend',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getListFriends.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getListFriends.fulfilled, (state, action) => {
            state.isLoading = false;
            state.friendList = action.payload?.data?.friends || [];
        });
        builder.addCase(getUserProfile.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.targetUser = action.payload?.data || {};
        });
        builder.addCase(getStatusFriend.fulfilled, (state, action) => {
            state.targetUser.status =
                action.payload?.data?.status || status.NOT_FRIEND;
        });
        builder.addCase(listRequest.fulfilled, (state, action) => {
            state.sentList = action.payload?.data?.sentList || [];
            state.receivedList = action.payload?.data?.receivedList || [];
        });
        builder.addCase(blockList.fulfilled, (state, action) => {
            state.blockList = action.payload?.data?.blocked_user || [];
        });
    },
});

export const selectFriendList = (state) => state.friend.friendList;
export const selectSentList = (state) => state.friend.sentList;
export const selectReceivedList = (state) => state.friend.receivedList;
export const selectFriendProfile = (state) => state.friend.targetUser;
export const selectIsLoading = (state) => state.friend.isLoading;
export const selectFriendLength = (state) => state.friend.friendList.length;
export const selectBlockedUser = (state) => state.friend.blockList;

export default friendSlice.reducer;
