import { env } from '@/constants';
import { client } from '@/plugins/axios/axios';

export const getNotifications = async () => {
    return await client.get(`${env.BASE_URL}/notification/list`);
};

export const setReadNotification = async (id) => {
    return await client.patch(`${env.BASE_URL}/notification/${id}/set-read`);
};
