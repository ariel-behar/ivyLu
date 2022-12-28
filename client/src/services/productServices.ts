import { IdType } from "../types/common/commonTypes";
import { ProductInterface } from "../types/productTypes";
import request from "../utils/request";
import { productsUrl } from "./api"; 

export const create = (product: ProductInterface, creatorId: IdType, authToken: string) => request(`${productsUrl}/create`, 'POST', {...product, creatorId}, authToken);

export const getAll = () => request(`${productsUrl}`, 'GET');

export const getOne = (productId: IdType) => request(`${productsUrl}/${productId}`, 'GET');

export const edit = (productId: IdType, product: ProductInterface, authToken: string) => request(`${productsUrl}/${productId}/edit`, 'POST', product, authToken);

export const deleteOne = (productId: IdType, product: undefined, authToken: string) => request(`${productsUrl}/${productId}/delete`, 'GET', product, authToken);