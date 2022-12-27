import request from "../utils/request";
import { servicesUrl } from "./api"; 

export const create = (service: object, creatorId: string, authToken: string) => request(`${servicesUrl}/create`, 'POST', {...service, creatorId}, authToken);

export const getAll = () => request(`${servicesUrl}`, 'GET');

export const getOne = (serviceId: string) => request(`${servicesUrl}/${serviceId}`, 'GET');

export const edit = (serviceId: string, service: object, authToken: string) => request(`${servicesUrl}/${serviceId}/edit`, 'POST', service, authToken);

export const deleteOne = (serviceId: string, service: undefined, authToken: string) => request(`${servicesUrl}/${serviceId}/delete`, 'GET', service, authToken);