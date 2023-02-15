import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    login,
    register,
    logout,
    getSelfProfile,
    editSelfProfile,
    activateAccount,
} from '@/services/auth.api';

const initialState = {
    isLoggedIn: false,
    loginUser: {},
    isLoading: false,
};

export const handleLogin = createAsyncThunk('auth/login', async (body) => {
    return await login(body);
});

export const handleRegister = createAsyncThunk(
    'auth/register',
    async (body) => {
        return await register(body);
    },
);

export const handleActivateAccount = createAsyncThunk(
    'auth/activateAccount',
    async (body) => {
        return await activateAccount(body);
    },
);

export const handleLogout = createAsyncThunk('auth/logout', async () => {
    return logout();
});

export const fetchSelfDetail = createAsyncThunk(
    'auth/fetchSelfDetail',
    async () => {
        return await getSelfProfile();
    },
);

export const handleEditSelfProfile = createAsyncThunk(
    'auth/editSelfDetail',
    async (body) => {
        return await editSelfProfile(body);
    },
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.pending, (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = true;
        });
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(handleRegister.pending, (state, action) => {
            state.isLoggedIn = false;
            state.isLoading = true;
        });
        builder.addCase(handleRegister.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(handleActivateAccount.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(handleActivateAccount.fulfilled, (state, action) => {
            state.isLoading = false;
        });
        builder.addCase(handleLogout.fulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.loginUser = {};
        });
        builder.addCase(fetchSelfDetail.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSelfDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loginUser = action.payload?.data || [];
        });
        builder.addCase(handleEditSelfProfile.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(handleEditSelfProfile.fulfilled, (state, action) => {
            state.isLoading = false;
            state.loginUser = action.payload?.data || state.loginUser;
        });
    },
});

export const { setIsLoggedIn } = authSlice.actions;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectLoginUser = (state) => state.auth.loginUser;
export const selectIsLoading = (state) => state.auth.isLoading;

export default authSlice.reducer;
