
import { OrderCreateDTO } from "../models/Order";
import { AuthTokenType } from "../types/common/common-types";
import request from "../utils/request";
import { baseUrl } from "./api";

const ordersUrl = `${baseUrl}/orders`

export const create = (order: OrderCreateDTO, authToken: AuthTokenType) => {
    console.log('authToken:', authToken)
    console.log('order:', order)
    return request(`${ordersUrl}/create`, 'POST', order, authToken)
}



export const getAll = (authToken: AuthTokenType) => request(`${ordersUrl}`, 'GET', undefined, authToken)