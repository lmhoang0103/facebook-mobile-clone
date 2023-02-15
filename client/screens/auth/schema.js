import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    phonenumber: yup.string(),
    password: yup.string(),
});

export const registerSchema = yup.object().shape({
    phonenumber: yup.string(),
    password: yup.string(),
    firstName: yup.string(),
    lastName: yup.string(),
});
