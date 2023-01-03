import Staff from '../models/Staff.js'
import Client from '../models/Client.js'
import mongoose from 'mongoose';

const selectedFields = {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1, imgUrl: 1}

export const getOneByEmail = (userEntityModel, email) => mongoose.model(userEntityModel).findOne({email: email});

export const getAll = (userEntityModel) => mongoose.model(userEntityModel).find({}, selectedFields ).lean();

export const getManyFilteredBy = (userEntityModel, filters) => mongoose.model(userEntityModel).find(filters, selectedFields).lean();

export const register = (userEntityModel, user) => mongoose.model(userEntityModel).create(user);

export const login = (userEntityModel ,email) => mongoose.model(userEntityModel).findOne({email}).lean()

export const deleteOne = (userEntityModel, userId) => mongoose.model(userEntityModel).deleteOne({_id: userId});