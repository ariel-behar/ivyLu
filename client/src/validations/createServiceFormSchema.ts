import * as yup from 'yup'

import { IMAGE_URL_REGEX, LATIN_CHARACTERS_REGEX } from '../utils/regex'



const createServiceFormSchema = yup.object().shape({
    title: yup
        .string()
        .required('Title is Required')
        .matches(LATIN_CHARACTERS_REGEX, 'Only characters from the latin alphabet are allowed')
        .min(2, "Title should be at least 2 characters long")
        .max(30, "Title should be at most 30 characters long"),
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
        .min(1, "Price should be at least 1 BGN")
        .max(3, "Price should be at most 999 BGN"),
    duration: yup
        .string()
        .required('Duration is required'),
})

export default createServiceFormSchema;