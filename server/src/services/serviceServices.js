import Service from '../models/Service.js'

export const create = (service) => Service.create(service);

export const getOneByTitle = (title) => Service.findOne({title: title});

export const getAll = () => Service.find({}).lean()

export const getOne = (serviceId) => Service.findById(serviceId)

export const updateOne = (serviceId, service) => Service.findByIdAndUpdate(serviceId, service, { new: true });

export const deleteOne = (serviceId) => Service.deleteOne({_id: serviceId});
