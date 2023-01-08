import { AuthTokenType, Identifiable } from "../types/common/commonTypes";
import request from "../utils/request";
import { baseUrl } from "./api";
export interface ApiUser<I, E extends Identifiable<I>, A extends AuthTokenType> {
    register(userWithoutId: Omit<E, 'id'>, authToken?: A): Promise<E>;
    login(user: E): Promise<E>;
    getAll(authToken?: A): Promise<E[]>;
    getManyFilteredBy(filter: object): Promise<E[]>
    update(entityId: I, entity: E, authToken: A): Promise<E>;
    deleteOne(entityId: I, entity: undefined, authToken: A): Promise<string>;
}

export class ApiUserImpl<I, E extends Identifiable<I>, A extends AuthTokenType> implements ApiUser<I, E, A> {
    constructor(public apiCollectionSuffix: string) {}
    
    register(userWithoutId: Omit<E, "id">, authToken?: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/register`, 'POST', userWithoutId, authToken);
    }

    login(user: E): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/login`, 'POST', user);
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

    update(entityId: I, entity: E, authToken: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}/edit`, 'POST', entity, authToken);
    }
    deleteOne(entityId: I, entity: undefined, authToken: A): Promise<string> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}/delete`, 'GET', entity, authToken);
    }
}

