const useUserRole = (roleNum: number) => {
    switch (roleNum) {
        case 1:
            return 'customer'
        case 2:
            return 'operator'
        case 3: 
            return 'admin'
        default:
            return 'Invalid role input'
    }
}

export default useUserRole;