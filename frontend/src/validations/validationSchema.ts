import * as Yup from 'yup';

export const registerValidationSchema = Yup.object({
    name: Yup.string()
        .max(15, 'Maximum name chars are 15 characters')
        .min(3, 'Minimum name chars are 3 characters')
        .required('Name is required'),
    email: Yup.string().email('Invalid format').required('Email is required'),
    password: Yup.string()
        .matches(
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character (!@#$%^&*).'
        )
        .required('password is required'),
    rePassword: Yup.string().oneOf([Yup.ref("password")], 'Passwords must match'),
});

export const loginValidationSchema = Yup.object({
    email: Yup.string().email('Invalid format').required('Email is required'),
    password: Yup.string()
        .required('password is required')
});
