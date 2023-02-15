import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist';
import authReducer from '../../screens/auth/reducers/auth.reducer';
import chatReducer from '../../screens/chat/reducers/chat.reducer';
import homeReducer from '../../screens/home/reducers/home.reducer';
import notificationReducer from '../../screens/notification/reducers/notification.reducer';
import postDetailReducer from '../../screens/post-detail/reducers/post-detail.reducer';
import friendReducer from '../../screens/profile/reducers/friend.reducer';
import searchReducer from '../../screens/search/reducers/search.reducer';
import settingsReducer from '../../screens/settings/reducers/settings.reducer';

function makeReducers() {
    return combineReducers({
        auth: authReducer,
        home: homeReducer,
        postDetail: postDetailReducer,
        friend: friendReducer,
        search: searchReducer,
        notification: notificationReducer,
        chat: chatReducer,
        settings: settingsReducer,
    });
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, makeReducers());

function makeStore() {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [
                        FLUSH,
                        REHYDRATE,
                        PAUSE,
                        PERSIST,
                        PURGE,
                        REGISTER,
                    ],
                },
            }),
    });
}

export const store = makeStore();
export const persistor = persistStore(store);
