import { env } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { isEmpty } from 'lodash';
import { isParsable } from '../../utilities/Parser';

export const client = axios.create({
    baseURL: env.BASE_URL,
    timeout: 60000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'X-Custom-Header': 'foobar',
        'Content-Type': 'application/json',
    },
    responseType: 'json',
});

// Add a request interceptor
client.interceptors.request.use(
    async function (config) {
        // Do something before request is sent
        const accessToken = await AsyncStorage.getItem('accessToken');
        if (!isEmpty(accessToken)) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        } else {
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a response interceptor
client.interceptors.response.use(
    function (response) {
        if (response.data) {
            if (
                typeof response?.data === 'string' &&
                isParsable(response?.data)
            )
                response.data = JSON.parse(response.data);
            response.data = {
                ...response?.data,
                success: true,
            };
        } else {
            const message = 'We had trouble connecting to the server';
            if (!response?.data?.message) response.data.message = message;
            response.data = {
                ...(response?.data || {}),
                success: false,
            };
        }
        return response.data;
    },
    function (error) {
        if (error.response) {
            if (
                typeof error?.response?.data === 'string' &&
                isParsable(error?.response?.data)
            ) {
                error.response.data = JSON.parse(error.response.data);
            }
            error.response.data = {
                ...(error?.response?.data || {}),
                success: false,
            };
            return error.response.data;
        } else if (error.request) {
            error.request.data = {
                ...(error?.request?.data || {}),
                success: false,
                isRequestError: true,
                message: error.message,
            };
            return error.request?.data;
        }
        return {
            ...error,
            status: 500,
            statusText: 'An error occurred! Try again.',
            headers: {},
            success: false,
            message: 'An error occurred! Try again.',
            data: undefined,
            code: 500,
        };
    },
);

export const getAccessToken = async () => {
    return await AsyncStorage.getItem('accessToken');
};

export const getAccessTokenCb = (cb) => {
    return AsyncStorage.getItem('accessToken', cb);
};

export const setAccessToken = async (token) => {
    await AsyncStorage.setItem('accessToken', token);
};
