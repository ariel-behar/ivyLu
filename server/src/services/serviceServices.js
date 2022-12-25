const Service = require('../models/Service')

exports.create = (service) => Service.create(service);

exports.findOneByTitle = (title) => Service.findOne({title: title});