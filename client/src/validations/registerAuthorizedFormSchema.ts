import * as yup from 'yup'
import { IMAGE_URL_REGEX, LATIN_CHARACTERS_REGEX } from '../utils/regex';

import { registerFormSchemaShape } from './registerFormSchema'

const registerAuthorizedFormSchema = yup.object().shape({
    ...registerFormSchemaShape,
    role: yup
        .number()
        .required('User Role is required')
        .oneOf([2, 3, 4], 'User Role should be either "Hairdresser", "Operator" or "Admin"')
        .nullable(),
    about: yup
        .string()
        .when('role', {
            is: (role: number) => role === 2,
            then:
                yup
                    .string()
                    .min(30, 'About hairdresser needs to be at least 30 characters long')
                    .max(250, 'About hairdresser needs to be at most 250 characters long')
                    .matches(LATIN_CHARACTERS_REGEX, 'Only characters from the latin alphabet are allowed')
        }),
    imgUrl: yup
        .string()
        .when('role', {
            is: (role: number) => role === 2,
            then:
                yup.string()
                    .required('User Picture is required for role "Hairdresser", since it will be displayed on the "OUR TEAM" page')
                    .matches(IMAGE_URL_REGEX, 'Image URL should start with "http://" or "https://" and end with either .jpg|.jpeg|.png|.gif|.svg')
        })

})

export default registerAuthorizedFormSchema;