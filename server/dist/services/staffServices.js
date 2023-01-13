import Staff from '../models/Staff.js';
const selectedFields = { firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1, imgUrl: 1, about: 1 };
export const getOneByEmail = (email) => Staff.findOne({ email: email }).lean();
export const getAll = () => Staff.find({}, selectedFields).lean();
export const getOne = (userId) => Staff.findById(userId).lean();
export const getManyFilteredBy = (filters) => Staff.find(filters, selectedFields).lean();
export const register = (user) => Staff.create(user);
export const login = (email) => Staff.findOne({ email }).lean();
export const deleteOne = (userId) => Staff.deleteOne({ _id: userId });
export const update = (userId, user) => Staff.findByIdAndUpdate(userId, user, { new: true });
//# sourceMappingURL=staffServices.js.map