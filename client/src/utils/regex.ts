//Valid Phone number pattern:
export const PHONE_PATTERN_REGEX = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
export const PASSWORD_PATTERN_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

export const IMAGE_URL_REGEX = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]|[Ss][Vv][Gg]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/gm

export const LATIN_CHARACTERS_REGEX = /[a-zA-z]/i

export const ONLY_DIGITS = /^[0-9]+$/