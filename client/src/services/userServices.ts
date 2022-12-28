import { UserInterface } from "../types/userTypes";
import request from "../utils/request";
import { usersUrl } from "./api";

export const register = (user: UserInterface) => request(`${usersUrl}/register`, 'POST', user);

export const login = (user: object) => request(`${usersUrl}/login`, 'POST', user);

export const getAll = () => request(`${usersUrl}`, 'GET');
