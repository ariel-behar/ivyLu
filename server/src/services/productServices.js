const Product = require('../models/Product')

exports.create = (product) => Product.create(product);

exports.getOneByTitle = (title) => Product.findOne({title: title});

exports.getAll = () => Product.find({}).lean()

// exports.getOne = (serviceId) => Product.findById(serviceId)

// exports.updateOne = (serviceId, service) => Product.findByIdAndUpdate(serviceId, service, { new: true });

// exports.deleteOne = (serviceId) => Product.deleteOne({_id: serviceId});
