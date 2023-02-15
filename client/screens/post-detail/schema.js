import * as yup from 'yup';

export const commentSchema = yup.object().shape({
    comment: yup.string().max(500).required(),
});
