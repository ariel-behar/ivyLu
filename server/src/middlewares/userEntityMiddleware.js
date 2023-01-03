const userEntityMiddleware = function (req, res, next) {
    let userEntity = req.originalUrl.split('/')[1];

    if(userEntity === 'clients') {
        userEntity = 'Client'
    } else if (userEntity === 'staff') {
        userEntity = 'Staff'
    }

    req.userEntity = userEntity

    next();
}

export default userEntityMiddleware;