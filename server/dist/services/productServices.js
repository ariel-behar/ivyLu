import Product from '../models/Product.js';
export const create = (product) => Product.create(product);
export const getOneByTitle = (title) => Product.findOne({ title: title });
export const getAll = () => Product.find({}).lean();
export const getOne = (productId) => Product.findById(productId);
export const updateOne = (productId, product) => Product.findByIdAndUpdate(productId, product, { new: true });
export const deleteOne = (productId) => Product.deleteOne({ _id: productId });
//# sourceMappingURL=productServices.js.map