import request from "../utils/request";

import { OrderCreateDTO } from "../models/Order";
import { AuthTokenType, IdType } from "../types/common/common-types";

import { baseUrl } from "./api";

const ordersUrl = `${baseUrl}/orders`

export const create = (order: OrderCreateDTO, authToken: AuthTokenType) => request(`${ordersUrl}`, 'POST', order, authToken)

export const getAll = (authToken: AuthTokenType) => request(`${ordersUrl}`, 'GET', undefined, authToken)

export const getAllClientsOrders = (userId: IdType, authToken: AuthTokenType) => request(`${ordersUrl}/${userId}`, 'GET', undefined, authToken)