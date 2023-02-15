import * as yup from 'yup';

export const createPostSchema = yup.object().shape({
    described: yup.string().trim().max(500).required(),
});
