const User = require('../models/User')


exports.register = (user) => User.create(user);