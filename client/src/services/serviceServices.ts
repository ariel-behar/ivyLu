import request from "../utils/request";

let servicesUrl = 'http://localhost:3030/services';

export const create = (service: object) => request(`${servicesUrl}/create`, 'POST', service);