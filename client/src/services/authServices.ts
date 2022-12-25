import request from "../utils/request";
import { usersUrl } from "./api";

export const register = (user: object) => request(`${usersUrl}/register`, 'POST', user);

export const login = (user: object) => request(`${usersUrl}/login`, 'POST', user);