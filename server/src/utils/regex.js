// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character:
const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

//Valid Phone number pattern:
const PHONE_PATTERN = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/

//Email pattern:
const EMAIL_PATTERN = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const LATIN_CHARACTERS = /[a-zA-z]/i

const IMAGE_URL = /^(?:(?<scheme>[^:\/?#]+):)?(?:\/\/(?<authority>[^\/?#]*))?(?<path>[^?#]*\/)?(?<file>[^?#]*\.(?<extension>[Jj][Pp][Ee]?[Gg]|[Pp][Nn][Gg]|[Gg][Ii][Ff]|[Ss][Vv][Gg]))(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?$/gm

module.exports = {
    PASSWORD_PATTERN,
    PHONE_PATTERN,
    EMAIL_PATTERN,
    LATIN_CHARACTERS,
    IMAGE_URL
}