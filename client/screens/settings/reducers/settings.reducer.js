import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    message: true,
    like: true,
    comment: true,
    addFriend: true,
};

export const fetchSettings = createAsyncThunk(
    'settings/fetchSettings',
    async () => {
        return await Promise.all([
            AsyncStorage.getItem('noti-message'),
            AsyncStorage.getItem('noti-like'),
            AsyncStorage.getItem('noti-comment'),
            AsyncStorage.getItem('noti-addFriend'),
        ]);
    },
);

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSettings.fulfilled, (state, action) => {
            const [message, like, comment, addFriend] = action.payload || [];
            state.message = JSON.parse(message);
            state.like = JSON.parse(like);
            state.comment = JSON.parse(comment);
            state.addFriend = JSON.parse(addFriend);
        });
    },
});

export const selectSettingsState = (state) => state.settings;

export default settingsSlice.reducer;
