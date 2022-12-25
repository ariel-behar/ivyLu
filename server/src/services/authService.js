const User = require('../models/User')

exports.getOneByEmail = (email) => User.findOne({email: email});

exports.register = (user) => User.create(user);

exports.login = (email) => {
    return User.findOne({email}).lean()
}