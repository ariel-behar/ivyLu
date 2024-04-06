import * as yup from 'yup'
import { productCategories } from '../utils/constants';

import { IMAGE_URL_REGEX, LATIN_CHARACTERS_REGEX, ONLY_DIGITS_REGEX, PRICE_REGEX } from '../utils/regex'

const createProductFormSchemaShape = {
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
    productCategory: yup
        .string()
        .required('Product Category is required')
        .oneOf(productCategories, 'Product category should be chosen from the available options'),
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
    volume: yup
        .string()
        .matches(ONLY_DIGITS_REGEX, "Product volume must be between 1 to 4 digits")
        .min(1, 'Product volume must be at least 1 digit')
        .max(4, 'Product volume must be at most 4 digits')
        .required('Product volume is required'),
    volumeMeasurementUnit: yup
        .string()
        .required('The appropriate volume measurement unit is required')
        .oneOf(['grams', 'milliliters'], 'You should pick the appropriate volume measurement unit'),
    productCode: yup
        .string()
        .required('Product code is required')
        .matches(ONLY_DIGITS_REGEX, "Product code must be comprised of 5 digits")
        .min(5, 'Product code must be exactly 5 digits')
        .max(5, 'Product code must be exactly 5 digits'),
    status: yup
        .string()
        .required('Status is required')
        .oneOf(['active', 'inactive'], 'Status should be either Active or Inactive')
        .nullable(),
}

const createProductFormSchema = yup.object().shape(createProductFormSchemaShape)

export default createProductFormSchema;