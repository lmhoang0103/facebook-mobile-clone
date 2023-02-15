import { env } from '@/constants';
import { client } from '@/plugins/axios/axios';

export const getCommentList = (postId) => {
    return client.get(`${env.BASE_URL}/postComment/list/${postId}`);
};

export const createComment = (postId, body) => {
    return client.post(`${env.BASE_URL}/postComment/create/${postId}`, body);
};
