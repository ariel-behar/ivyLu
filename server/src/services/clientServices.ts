import Client, { IClientDocument, IClientRegister } from '../models/Client.js';
import { IdType, Partial } from '../types/common-types.js';

const selectedFields = {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1, imgUrl: 1, about: 1}

export const getOneByEmail = (email: IClientDocument['email']) => Client.findOne({email: email}).lean();

export const getAll = () => Client.find({}, selectedFields ).lean();

export const getManyFilteredBy = (filters: Partial<IClientDocument>) => Client.find(filters, selectedFields).lean();

export const register = (user: IClientRegister) => Client.create(user);

export const login = (email: IClientDocument['email']) => Client.findOne({email}).lean()

export const update = (userId: IdType, user: Partial<IClientDocument>) => Client.findByIdAndUpdate(userId, user, {new: true});

export const deleteOne = (userId: IdType) => Client.deleteOne({_id: userId});