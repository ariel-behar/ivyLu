import { Identifiable } from "../types/common/commonTypes";
import request from "../utils/request";

let baseUrl = 'http://localhost:3030'

export interface ApiUser<I, E extends Identifiable<I>> {
    register(userWithoutId: Omit<E, 'id'>): Promise<E>;
    login(user: E): Promise<E>;
    getAll(): Promise<E[]>;
    getManyFilteredBy(filter: object): Promise<E[]>
}

export class ApiUserImpl<I, E extends Identifiable<I>> implements ApiUser<I, E> {
    constructor(public apiCollectionSuffix: string) {}
    
    register(userWithoutId: Omit<E, "id">): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/register`, 'POST', userWithoutId);
    }

    login(user: E): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/login`, 'POST', user);
    }

    getAll(): Promise<E[]> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}`, 'GET');
    }

    getManyFilteredBy(filter: object): Promise<E[]> {
        let queryString = []

        for (const key in filter) {
            queryString.push(`${key}=${filter[key as keyof typeof filter]}`)
        }

        return request(`${baseUrl}/${this.apiCollectionSuffix}?${queryString.join('&')}`, 'GET');
    }
}

