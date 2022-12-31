import User from '../models/User.js'

export const getOneByEmail = (email) => User.findOne({email: email});

export const getAll = () => User.find({}, {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1}).lean();

export const register = (user) => User.create(user);

export const login = (email) => User.findOne({email}, {firstName: 1, lastName: 1, email: 1, phone: 1, gender: 1, role: 1}).lean()