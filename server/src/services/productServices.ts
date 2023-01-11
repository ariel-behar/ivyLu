import Product, { IProductCreate, IProductDocument } from '../models/Product.js'
import { IdType } from '../types/common-types.js';

export const create = (product: IProductCreate) => Product.create(product);

export const getOneByTitle = (title: IProductDocument['title']) => Product.findOne({title: title});

export const getAll = () => Product.find({}).lean()

export const getOne = (productId:IdType) => Product.findById(productId)

export const updateOne = (productId: IdType, product: Omit<IProductCreate, "creatorId"> ) => Product.findByIdAndUpdate(productId, product, { new: true });

export const deleteOne = (productId: IdType) => Product.deleteOne({_id: productId});
