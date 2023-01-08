
import { Order, OrderCreateDTO } from "../models/Order";
import { AuthTokenType } from "../types/common/commonTypes";
import request from "../utils/request";
import { baseUrl } from "./api";

const apiCollectionSuffix = 'orders'

export const order = (order: OrderCreateDTO, authToken: AuthTokenType) => request(`${baseUrl}/${apiCollectionSuffix}/create`, 'POST', order, authToken)