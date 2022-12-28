const User = require('../models/User')

exports.getOneByEmail = (email) => User.findOne({email: email});

exports.getAll = () => User.find({}, {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1}).lean();

exports.register = (user) => User.create(user);

exports.login = (email) => {
    return User.findOne({email}).lean()
}