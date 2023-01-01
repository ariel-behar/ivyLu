import * as yup from 'yup'

import { LATIN_CHARACTERS_REGEX, PHONE_PATTERN_REGEX, PASSWORD_PATTERN_REGEX } from '../utils/regex'

export const registerFormSchemaShape = {
        firstName: yup
                .string()
                .required('First Name is required')
                .matches(LATIN_CHARACTERS_REGEX, 'Only characters from the latin alphabet are allowed')
                .min(2, "First Name should be at least 2 characters long")
                .max(40, "First Name should be at most 40 characters long"),                
        lastName: yup
                .string()
                .required('Last Name is required')
                .matches(LATIN_CHARACTERS_REGEX, 'Only characters from the latin alphabet are allowed')
                .min(2, "Last Name should be at least 2 characters long")
                .max(40, "Last Name should be at most 40 characters long"),
        email: yup
                .string()
                .required('Email is required')
                .email('Input should be an e-mail address in a valid format'),
        phone: yup
                .string()
                .required('Phone number is required')
                .matches(PHONE_PATTERN_REGEX, 'The input should be a valid phone number')
                .min(6, "Phone number should be at least 6 characters long")
                .max(14, "Phone number should be at most 14 characters long"),
        gender: yup
                .string()
                .required('Gender is required')
                .oneOf(['male', 'female'], 'Gender should be either Male or Female')
                .nullable(),
        password: yup
                .string()
                .required('Password is required'),
                // .min(8, "Password should be at least 8 characters long")
                // .max(20, "Password should be at most 20 characters long")
                // .matches(PASSWORD_PATTERN_REGEX, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),
        confirmPassword: yup
                .string()
                .required('Confirm password is required')
                .oneOf([yup.ref("password")], "Password and Confirm Password must match")
}

const registerFormSchema = yup.object().shape(registerFormSchemaShape)

export default registerFormSchema;