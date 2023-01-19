import Staff, { IStaffDocument, IStaffRegister } from '../models/Staff.js';
import { IdType, Partial } from '../types/common-types.js';

const selectedFields = {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1, imgUrl: 1, about: 1}

export const getOneByEmail = (email: IStaffDocument['email']) => Staff.findOne({email: email}).lean();

export const getAll = () => Staff.find({}, selectedFields ).lean();

export const getOne = (userId: IdType) => Staff.findById(userId).lean()

export const getManyFilteredBy = (filters: Partial<IStaffDocument>) => Staff.find(filters, selectedFields).lean();

export const register = (user: IStaffRegister) => Staff.create(user);

export const login = (email: IStaffDocument['email']) => Staff.findOne({email}).lean()

export const deleteOne = (userId: IdType) => Staff.deleteOne({_id: userId});

export const update = (userId: IdType, user: IStaffRegister) => Staff.findByIdAndUpdate(userId, user, {new: true});