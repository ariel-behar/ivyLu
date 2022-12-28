const Product = require('../models/Product')

exports.create = (product) => Product.create(product);

exports.getOneByTitle = (title) => Product.findOne({title: title});

// exports.getAll = () => Service.find({}).lean()

// exports.getOne = (serviceId) => Service.findById(serviceId)

// exports.updateOne = (serviceId, service) => Service.findByIdAndUpdate(serviceId, service, { new: true });

// exports.deleteOne = (serviceId) => Service.deleteOne({_id: serviceId});
