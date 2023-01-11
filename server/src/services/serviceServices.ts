import Service, { IServiceCreate, IServiceDocument } from '../models/Service.js'
import { IdType } from '../types/common-types.js';

export const create = (service: IServiceCreate) => Service.create(service);

export const getOneByTitle = (title: IServiceDocument['title']) => Service.findOne({title: title});

export const getAll = () => Service.find({}).lean()

export const getOne = (serviceId: IdType) => Service.findById(serviceId)

export const updateOne = (serviceId: IdType, service: Omit<IServiceCreate, "creatorId">) => Service.findByIdAndUpdate(serviceId, service, { new: true });

export const deleteOne = (serviceId: IdType) => Service.deleteOne({_id: serviceId});
