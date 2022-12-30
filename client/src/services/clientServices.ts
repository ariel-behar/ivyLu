import { AuthTokenType, Identifiable } from "../types/common/commonTypes";
import request from "../utils/request";

let baseUrl = 'http://localhost:3030'

export interface ApiClient<I, E extends Identifiable<I>, A extends AuthTokenType> {
    register(userWithoutId: Omit<E, 'id'>): Promise<E>;
    login(user: E): Promise<E>;

    getAll(): Promise<E[]>;
    getOne(entityId: I): Promise<E>;
    create(entityWithoutId: Omit<E, 'id'>, userId: I, authToken: A): Promise<E>;
    update(entityId: I, entity: E, authToken: A): Promise<E>;
    deleteOne(entityId: I, entity: undefined, authToken: A): Promise<string>;
}

export class ApiClientImpl<I, E extends Identifiable<I>, A extends AuthTokenType> implements ApiClient<I,E,A> {
    constructor(public apiCollectionSuffix: string) {}

    // User related
    register(userWithoutId: Omit<E, "id">): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/register`, 'POST', userWithoutId);
    }
    login(user: E): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/login`, 'POST', user);
    }

    // Common - User and Entities related
    getAll(): Promise<E[]> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}`, 'GET');
    }

    // Entities related
    getOne(entityId: I): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}`, 'GET');
    }
    create(entityWithoutId: Omit<E, "id">, userId: I, authToken: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/create`, 'POST', {...entityWithoutId, userId}, authToken);
    }
    update(entityId: I, entity: E, authToken: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}/edit`, 'POST', entity, authToken);
    }
    deleteOne(entityId: I, entity: undefined, authToken: A): Promise<string> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}/delete`, 'GET', entity, authToken);
    }
 

}

