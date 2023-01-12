import Order, { IOrderCreate } from '../models/Order.js'
import { IdType } from '../types/common-types.js';

export const create = (order: IOrderCreate) => Order.create(order);

export const getOne = (orderId: IdType) => Order.findById(orderId).populate('client').populate('product').lean();

export const getAll = () => Order.find({}).populate('client').populate('product').lean();

