import { gender } from '@/constants';

export const getUserName = (author) => {
    if (author?.firstName && author?.lastName)
        return `${author?.firstName} ${author?.lastName}`;
    if (author?.username) return author.username;
    return author?.firstName ?? author?.lastName;
};

export const getGender = (g) => {
    const find = gender.find((e) => e.value === g);
    if (find?.label) return find?.label;
    return g;
};

export const isAuthor = (author, loginUser) => {
    return author?._id === loginUser?._id;
};
