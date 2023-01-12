import Staff, { IStaffDocument, IStaffRegister } from '../models/Staff.js';
import { IdType } from '../types/common-types.js';

const selectedFields = {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1, imgUrl: 1, about: 1}

export const getOneByEmail = (email: IStaffDocument['email']) => Staff.findOne({email: email}).lean();

export const getAll = () => Staff.find({}, selectedFields ).lean();

export const getManyFilteredBy = (filters: object) => Staff.find(filters, selectedFields).lean();

export const register = (user: IStaffRegister) => Staff.create(user);

export const login = (email: IStaffDocument['email']) => Staff.findOne({email}).lean()

export const deleteOne = (userId: IdType) => Staff.deleteOne({_id: userId});