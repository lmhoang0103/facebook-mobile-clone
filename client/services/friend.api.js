import { env } from '@constants';
import { client } from 'plugins/axios/axios';

export const sendFriendRequest = async (body) => {
    return await client.post(
        `${env.BASE_URL}/friends/set-request-friend`,
        body,
    );
};

export const getRequestedFriends = async () => {
    return await client.post(`${env.BASE_URL}/friends/get-requested-friend`);
};

export const acceptRequest = async (body) => {
    return await client.post(`${env.BASE_URL}/friends/set-accept`, body);
};

export const cancelRequest = async (body) => {
    return await client.post(`${env.BASE_URL}/friends/cancel-request`, body);
};

export const removeFriend = async (body) => {
    return await client.post(`${env.BASE_URL}/friends/set-remove`, body);
};

export const listFriend = async () => {
    return await client.post(`${env.BASE_URL}/friends/list`);
};

export const getListRequest = async () => {
    return await client.get(`${env.BASE_URL}/friends/list_requests`);
};

export const getFriendStatus = async (params) => {
    return await client.get(`${env.BASE_URL}/friends/status/${params}`);
};

export const getFriendProfile = async (params) => {
    return await client.get(`${env.BASE_URL}/users/show/${params}`);
};

export const blockUserDiary = async (body) => {
    return await client.post(`${env.BASE_URL}/users/set-block-user`, body);
};

export const listBlockUser = async () => {
    return await client.get(`${env.BASE_URL}/friends/block_list`);
};
