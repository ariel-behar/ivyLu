const getUserRole = (roleNum: number) => {
    switch (roleNum) {
        case 1:
            return { lowerCase: 'customer', capitalized: 'Customer' }
        case 2:
            return { lowerCase: 'hairdresser', capitalized: 'Hairdresser' }
        case 3:
            return { lowerCase: 'operator', capitalized: 'Operator' }
        case 4:
            return { lowerCase: 'admin', capitalized: 'Admin' }
        default:
            return { lowerCase: 'Invalid role input', capitalized: 'Invalid role input' }
    }
}

export default getUserRole;