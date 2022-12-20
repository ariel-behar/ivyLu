import request from "../utils/request";

let usersUrl = 'http://localhost:3030/users';

export const register = (user: object) => request(`${usersUrl}/register`, 'POST', user);

export const login = (user: object) => request(`${usersUrl}/login`, 'POST', user);