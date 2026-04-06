import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required'),
});

export const registerSchema = yup.object().shape({
    first_name: yup
        .string()
        .required('First name is required')
        .min(2, 'First name must be at least 2 characters'),
    last_name: yup
        .string()
        .required('Last name is required')
        .min(2, 'Last name must be at least 2 characters'),
    email: yup
        .string()
        .email('Please enter a valid email address')
        .required('Email is required'),
    username: yup
        .string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
    phone_number: yup
        .string()
        .required('Phone number is required')
        .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
        .string()
        .required('Please confirm your password')
        .oneOf([yup.ref('password')], 'Passwords do not match'),
    date_of_birth: yup
        .string()
        .optional(),
    address: yup
        .string()
        .optional(),
    role: yup
        .string()
        .oneOf(['buyer', 'seller', 'admin'], 'Please select a valid role')
        .required('Please select a role'),
});

// Type exports for use in components
export type LoginFormData = yup.InferType<typeof loginSchema>;
export type RegisterFormData = yup.InferType<typeof registerSchema>;
