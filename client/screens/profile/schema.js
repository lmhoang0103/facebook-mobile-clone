import * as yup from 'yup';

export const editProfileSchema = yup.object().shape({
    phonenumber: yup.string().min(10).required(),
    firstName: yup.string().min(1).required(),
    lastName: yup.string().min(1).required(),
});
