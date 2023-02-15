import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    getNotifications,
    setReadNotification,
} from '../../../services/notification.api';

const initialState = {
    notificationList: [],
    isLoading: false,
};

export const fetchNotificationList = createAsyncThunk(
    'notification/fetchNotificationList',
    async () => {
        return await getNotifications();
    },
);

export const readNotification = createAsyncThunk(
    'notification/readNotification',
    async (id) => {
        return await setReadNotification(id);
    },
);

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNotificationList.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchNotificationList.fulfilled, (state, action) => {
            state.isLoading = false;
            state.notificationList = action.payload?.data || [];
        });
        builder.addCase(readNotification.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(readNotification.fulfilled, (state, action) => {
            state.isLoading = false;
        });
    },
});

export const selectNotificationList = (state) =>
    state.notification.notificationList;
export const selectIsLoading = (state) => state.notification.isLoading;
export const selectUnreadNotificationCount = (state) =>
    state.notification.notificationList.filter(
        (notification) => !notification.isRead,
    ).length;

export default notificationSlice.reducer;
