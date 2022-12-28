import { IdType } from "../types/common/commonTypes";
import { ServiceInterface } from "../types/serviceTypes";
import request from "../utils/request";
import { servicesUrl } from "./api"; 

export const create = (service: ServiceInterface, creatorId: IdType, authToken: string) => request(`${servicesUrl}/create`, 'POST', {...service, creatorId}, authToken);

export const getAll = () => request(`${servicesUrl}`, 'GET');

export const getOne = (serviceId: IdType) => request(`${servicesUrl}/${serviceId}`, 'GET');

export const edit = (serviceId: IdType, service: ServiceInterface, authToken: string) => request(`${servicesUrl}/${serviceId}/edit`, 'POST', service, authToken);

export const deleteOne = (serviceId: IdType, service: undefined, authToken: string) => request(`${servicesUrl}/${serviceId}/delete`, 'GET', service, authToken);