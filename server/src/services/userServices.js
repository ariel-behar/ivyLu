import User from '../models/User.js'

const selectedFields = {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1, imgUrl: 1}

export const getOneByEmail = (email) => User.findOne({email: email});

export const getAll = () => User.find({}, selectedFields ).lean();

export const getManyFilteredBy = (filters) => User.find(filters, selectedFields).lean();

export const register = (user) => User.create(user);

export const login = (email) => User.findOne({email}).lean()

export const deleteOne = (userId) => User.deleteOne({_id: userId});