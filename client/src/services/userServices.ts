import request from "../utils/request";

import { AuthTokenType, Identifiable, Partial } from "../types/common/common-types";

import { baseUrl } from "./api";
export interface ApiUser<I, E extends Identifiable<I>, A extends AuthTokenType> {
    register(userWithoutId: Omit<E, 'id'>, authToken?: A): Promise<E>;
    login(user: E): Promise<E>;
    getOne(userId: I, authToken: A): Promise<E>;
    getAll(authToken?: A): Promise<E[]>;
    getManyFilteredBy(filter: object): Promise<E[]>
    update(userId: I, userData: Partial<E>, authToken: A): Promise<E>;
    deleteOne(userId: I, userData: undefined, authToken: A): Promise<string>;
}

export class ApiUserImpl<I, E extends Identifiable<I>, A extends AuthTokenType> implements ApiUser<I, E, A> {
    constructor(public apiCollectionSuffix: string) {}

    
    register(userWithoutId: Omit<E, "id">, authToken?: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/register`, 'POST', userWithoutId, authToken);
    }

    login(user: E): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/login`, 'POST', user);
    }

    getOne(userId: I, authToken: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${userId}`, 'GET', undefined, authToken);
    }

    getAll(authToken?: A): Promise<E[]> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}`, 'GET', undefined, authToken);
    }

    getManyFilteredBy(filter: object): Promise<E[]> {
        let queryString = []

        for (const key in filter) {
            queryString.push(`${key}=${filter[key as keyof typeof filter]}`)
        }

        return request(`${baseUrl}/${this.apiCollectionSuffix}?${queryString.join('&')}`, 'GET');
    }

    update(userId: I, userData: Partial<E>, authToken: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${userId}`, 'PATCH', userData, authToken);
    }
    
    deleteOne(userId: I, userData: undefined, authToken: A): Promise<string> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${userId}`, 'DELETE', userData, authToken);
    }
}

