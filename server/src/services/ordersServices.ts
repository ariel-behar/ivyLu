import { IClientDocument } from '../models/Client.js';
import Order, { IOrderCreate } from '../models/Order.js'
import { IdType } from '../types/common-types.js';

export const create = (order: IOrderCreate) => Order.create(order);

export const getOne = (orderId: IdType) => Order.findById(orderId).populate('client').populate('product').lean();

export const getAll = () => Order.find({}).populate('client').populate('product').lean();

export const getAllClientsOrders = (clientId: IClientDocument['_id']) => Order.find({client: clientId}).populate('product').lean();

