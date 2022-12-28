import * as yup from 'yup'

import { IMAGE_URL_REGEX, LATIN_CHARACTERS_REGEX, PRICE_REGEX } from '../utils/regex'

const createServiceFormSchema = yup.object().shape({
    title: yup
        .string()
        .required('Title is Required')
        .matches(LATIN_CHARACTERS_REGEX, 'Only characters from the latin alphabet are allowed')
        .min(2, "Title should be at least 2 characters long")
        .max(50, "Title should be at most 50 characters long"),
    description: yup
        .string()
        .required('Description is required')
        .matches(LATIN_CHARACTERS_REGEX, 'Only characters from the latin alphabet are allowed')
        .min(5, "Description should be at least 5 characters long")
        .max(200, "Description should be at most 200 characters long"),
    additionalComments: yup
        .string()
        .matches(LATIN_CHARACTERS_REGEX, 'Only characters from the latin alphabet are allowed')
        .min(5, "Additional Comments should be at least 5 characters long")
        .max(100, "Additional Comments should be at most 100 characters long"),
    imgUrl: yup
        .string()
        .required('Image URL is required')
        .matches(IMAGE_URL_REGEX, 'Image URL should start with "http://" or "https://" and end with either .jpg|.jpeg|.png|.gif|.svg'),
    price: yup
        .string()
        .required('Price is required')
        .matches(PRICE_REGEX, 'Price should be between 1 and 999.99 BGN'),
    duration: yup
        .string()
        .required('Duration is required'),
    status: yup
        .string()
        .required('Status is required')
        .oneOf(['active', 'inactive'], 'Status should be either Active or Inactive')
        .nullable(),
})

export default createServiceFormSchema;