import request from "../utils/request";
import { servicesUrl } from "./api"; 

export const create = (service: object, creatorId: string) => request(`${servicesUrl}/create`, 'POST', {...service, creatorId});