const getOrderStatus = (roleNum: number) => {
    switch (roleNum) {
        case 1:
            return 'Pending'
        case 2:
            return 'In Progress'
        case 3:
            return 'Shipped'
        case 4:
            return 'Completed'
        case 5:
            return 'Canceled by Client'
        case 6:
            return 'Canceled by IvyLu'
        default:
            return 'Invalid status input'
    }
}

export default getOrderStatus;