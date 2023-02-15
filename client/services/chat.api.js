import { env } from '@/constants';
import { client } from '@/plugins/axios/axios';

export const getChats = async () => {
    return await client.get(`${env.BASE_URL}/chats/getChats`);
};

export const getMessages = async (chatId) => {
    return await client.get(`${env.BASE_URL}/chats/getMessages/${chatId}`);
};

export const getMessagesByFriend = async (friendId) => {
    return await client.get(
        `${env.BASE_URL}/chats/getMessagesbyfriendId/${friendId}`,
    );
};

export const deleteChat = async (chatId) => {
    return await client.delete(`${env.BASE_URL}/chats/deleteChat/${chatId}`);
};
