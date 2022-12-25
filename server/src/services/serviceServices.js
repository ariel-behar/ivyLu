const Service = require('../models/Service')

exports.create = (service) => Service.create(service);

exports.getOneByTitle = (title) => Service.findOne({title: title});

exports.getAll = () => Service.find({}).lean()