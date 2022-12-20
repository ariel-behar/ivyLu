import * as yup from 'yup'

//Valid Phone number pattern:
const PHONE_PATTERN = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const LATIN_CHARACTERS = /[a-zA-z]{2,}/i

const registerFormSchema = yup.object().shape({
        firstName: yup
                .string()
                .required('First Name is required')
                .matches(LATIN_CHARACTERS, 'Only characters from the latin alphabet are allowed')
                .min(2, "First Name should be at least 2 characters long")
                .max(40, "First Name should be at most 40 characters long"),                
        lastName: yup
                .string()
                .required('Last Name is required')
                .matches(LATIN_CHARACTERS, 'Only characters from the latin alphabet are allowed')
                .min(2, "Last Name should be at least 2 characters long")
                .max(40, "Last Name should be at most 40 characters long"),
        email: yup
                .string()
                .required('Email is required')
                .email('Input should be an e-mail address in a valid format'),
        phone: yup
                .string()
                .required('Phone number is required')
                .matches(PHONE_PATTERN, 'The input should be a valid phone number')
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
                // .matches(PASSWORD_PATTERN, "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"),
        confirmPassword: yup
                .string()
                .required('Confirm password is required')
                .oneOf([yup.ref("password")], "Password and Confirm Password must match")
})

export default registerFormSchema;