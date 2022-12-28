import * as yup from 'yup'

import { IMAGE_URL_REGEX, LATIN_CHARACTERS_REGEX, ONLY_DIGITS } from '../utils/regex'

const createProductFormSchema = yup.object().shape({
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
    volume: yup
        .string()
        .matches(ONLY_DIGITS, "Product volume must be between 1 to 4 digits")
        .min(1, 'Product volume must be at least 1 digit')
        .max(4, 'Product volume must be at most 4 digits')
        .required('Product volume is required'),
    volumeMeasurementUnit: yup
        .string()
        .required()
        .oneOf(['grams', 'milliliters'], 'You should pick the appropriate volume measurement unit'),
    productCode: yup
        .string()
        .required()
        .matches(ONLY_DIGITS, "Product code must be comprised of 5 digits")
        .min(5, 'Product code must be exactly 5 digits')
        .max(5, 'Product code must be exactly 5 digits'),
    status: yup
        .string()
        .required('Status is required')
        .oneOf(['active', 'inactive'], 'Status should be either Active or Inactive')
        .nullable(),
})

export default createProductFormSchema;