import * as yup from 'yup'

// title: string,
// description: string,
// additionalComments: string | null,
// imgUrl: string,
// price: number[] | number,
// duration: number,

const IMAGE_URL = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]|[Ss][Vv][Gg]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/gm

const LATIN_CHARACTERS = /[a-zA-z]/i

const createServiceFormSchema = yup.object().shape({
    title: yup
        .string()
        .required('Title is Require')
        .matches(LATIN_CHARACTERS, 'Only characters from the latin alphabet are allowed')
        .min(2, "Title should be at least 2 characters long")
        .max(30, "Title should be at most 30 characters long"),
    description: yup
        .string()
        .required('Description is required')
        .matches(LATIN_CHARACTERS, 'Only characters from the latin alphabet are allowed')
        .min(5, "Description should be at least 5 characters long")
        .max(200, "Description should be at most 200 characters long"),
    additionalComments: yup
        .string()
        .matches(LATIN_CHARACTERS, 'Only characters from the latin alphabet are allowed')
        .min(5, "Additional Comments should be at least 5 characters long")
        .max(100, "Additional Comments should be at most 100 characters long"),
    imgUrl: yup
        .string()
        .required('Image URL is required')
        .matches(IMAGE_URL, 'Enter a valid Image URL staring with "http://" or "https://" and ending with .jpg/ .jpeg/ .png/ .gif/ .svg'),
    price: yup
        .string()
        .required('Price is required')
        .min(1, "Price should be at least 1 character long")
        .max(3, "Price should be at most 3 characters long"),
    duration: yup
        .string()
        .required('Duration is required'),
})

export default createServiceFormSchema;