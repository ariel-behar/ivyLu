import Order from '../models/Order.js'

export const create = (order) => Order.create(order);

export const getOne = (orderId) => Order.findById(orderId).populate('client').populate('product');

export const getAll = () => Order.find({}).populate('client').populate('product').lean();

