import request from "../utils/request";
import { productsUrl } from "./api"; 

export const create = (product: object, creatorId: string, authToken: string) => request(`${productsUrl}/create`, 'POST', {...product, creatorId}, authToken);

export const getAll = () => request(`${productsUrl}`, 'GET');

// export const getOne = (serviceId: string) => request(`${productsUrl}/${serviceId}`, 'GET');

// export const edit = (serviceId: string, service: object, authToken: string) => request(`${productsUrl}/${serviceId}/edit`, 'POST', service, authToken);

// export const deleteOne = (serviceId: string, service: undefined, authToken: string) => request(`${productsUrl}/${serviceId}/delete`, 'GET', service, authToken);