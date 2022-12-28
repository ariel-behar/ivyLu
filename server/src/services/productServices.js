const Product = require('../models/Product')

exports.create = (product) => Product.create(product);

exports.getOneByTitle = (title) => Product.findOne({title: title});

exports.getAll = () => Product.find({}).lean()

exports.getOne = (productId) => Product.findById(productId)

exports.updateOne = (productId, product) => Product.findByIdAndUpdate(productId, product, { new: true });

// exports.deleteOne = (serviceId) => Product.deleteOne({_id: serviceId});
