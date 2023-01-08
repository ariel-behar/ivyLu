
import { OrderCreateDTO } from "../models/Order";
import { AuthTokenType } from "../types/common/commonTypes";
import request from "../utils/request";
import { baseUrl } from "./api";

export const order = (order:OrderCreateDTO, authToken: AuthTokenType) => request(`${baseUrl}/orders`, 'POST', order, authToken)