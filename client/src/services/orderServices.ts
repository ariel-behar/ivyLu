
import { OrderCreateDTO } from "../models/Order";
import { AuthTokenType } from "../types/common/commonTypes";
import request from "../utils/request";
import { baseUrl } from "./api";

const ordersUrl = `${baseUrl}/orders`

export const order = (order: OrderCreateDTO, authToken: AuthTokenType) => request(`${ordersUrl}/create`, 'POST', order, authToken)

export const getAll = (authToken: AuthTokenType) => request(`${ordersUrl}`, 'GET', undefined, authToken)