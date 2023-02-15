import { env } from '@/constants';
import { client } from '@/plugins/axios/axios';

export const getPosts = async (userId) => {
    return await client.get(`${env.BASE_URL}/posts/list`, {
        params: {
            userId,
        },
    });
};

export const getPost = (postId) => {
    return client.get(`${env.BASE_URL}/posts/show/${postId}`);
};

export const createPost = async (post) => {
    return await client.post(`${env.BASE_URL}/posts/create`, post);
};

export const editPost = async (id, body) => {
    return await client.post(`${env.BASE_URL}/posts/edit/${id}`, body);
};

export const deletePost = async (id) => {
    return await client.delete(`${env.BASE_URL}/posts/delete/${id}`);
};

export const actionLikePost = async (postId) => {
    return await client.post(`${env.BASE_URL}/postLike/action/${postId}`);
};

export const reportPost = async (id, body) => {
    return await client.post(`${env.BASE_URL}/postReport/create/${id}`, body);
};
