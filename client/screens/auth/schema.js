import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    phonenumber: yup.string().required('Hãy nhập số điện thoại'),
    password: yup
        .string()
        .min(8, 'Mật khẩu cần tối thiểu 8 kí tự')
        .required('Hãy nhập mật khẩu')
        .not([yup.ref('phonenumber')]),
});

export const registerSchema = yup.object().shape({
    phonenumber: yup.string().required('Hãy nhập số điện thoại'),
    username: yup.string().required('Hãy nhập username'),
    password: yup
        .string()
        .min(8, 'Mật khẩu cần tối thiểu 8 kí tự')
        .required('Hãy nhập mật khẩu')
        .not([yup.ref('phonenumber')]),
    confirmationEmail: yup.string().required('Bạn cần nhập lại email'),
    firstName: yup.string().required('Hãy nhập first name'),
    lastName: yup.string().required('Hãy nhập last name'),
});
