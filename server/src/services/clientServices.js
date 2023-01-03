import Client from '../models/Customer.js'

const selectedFields = {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1, imgUrl: 1}

export const getOneByEmail = (email) => Client.findOne({email: email});

export const getAll = () => Client.find({}, selectedFields ).lean();

export const getManyFilteredBy = (filters) => Client.find(filters, selectedFields).lean();

export const register = (user) => Client.create(user);

export const login = (email) => Client.findOne({email}).lean()

export const deleteOne = (userId) => Client.deleteOne({_id: userId});