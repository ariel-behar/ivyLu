const User = require('../models/User')

exports.findOneByEmail = (email) => User.findOne({email: email});

exports.register = (user) => User.create(user);

exports.login = (email) => {
    return User.findOne({email}).lean()
}