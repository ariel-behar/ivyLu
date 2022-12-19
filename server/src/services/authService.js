const User = require('../models/User')

exports.findOneByEmail = (email) => User.findOne({email: email});

exports.register = (user) => User.create(user);