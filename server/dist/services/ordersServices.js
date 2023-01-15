import Order from '../models/Order.js';
export const create = (order) => Order.create(order);
export const getOne = (orderId) => Order.findById(orderId).populate('client').populate('product').lean();
export const getAll = () => Order.find({}).populate('client').populate('product').lean();
export const getAllClientsOrders = (userId) => Order.find({ client: userId }).populate('product').lean();
//# sourceMappingURL=ordersServices.js.map