import * as yup from 'yup'
import { IMAGE_URL_REGEX } from '../utils/regex';

import { registerFormSchemaShape } from './registerFormSchema'

const registerAuthorizedFormSchema = yup.object().shape({
    ...registerFormSchemaShape,
    role: yup
        .number()
        .required('User Role is required')
        .oneOf([2, 3, 4], 'User Role should be either "Hairdresser", "Operator" or "Admin"')
        .nullable(),
    imgUrl: yup
        .string()
        .when('role', {
            is: (role: number) => role === 2,
            then:
                yup.string()
                    .required('User Picture is required for the role "Hairdresser", because it will be displayed on the "OUR TEAM" page')
                    .matches(IMAGE_URL_REGEX, 'Image URL should start with "http://" or "https://" and end with either .jpg|.jpeg|.png|.gif|.svg')
        })
})

export default registerAuthorizedFormSchema;