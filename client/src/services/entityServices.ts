import { AuthTokenType, Identifiable } from "../types/common/common-types";
import request from "../utils/request";
import { baseUrl } from "./api";
export interface ApiEntity<I, E extends Identifiable<I>, A extends AuthTokenType> {
    getOne(entityId: I): Promise<E>;
    getAll(): Promise<E[]>;
    getManyFilteredBy(filter: object): Promise<E[]>
    create(entityWithoutId: Omit<E, 'id'>, userId: I, authToken: A): Promise<E>;
    update(entityId: I, entity: E, authToken: A): Promise<E>;
    deleteOne(entityId: I, entity: undefined, authToken: A): Promise<string>;
}
export class ApiEntityImpl<I, E extends Identifiable<I>, A extends AuthTokenType> implements ApiEntity<I,E,A> {
    constructor(public apiCollectionSuffix: string) {}

    getOne(entityId: I): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}`, 'GET');
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

    create(entityWithoutId: Omit<E, "id">, userId: I, authToken: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}`, 'POST', {...entityWithoutId, userId}, authToken);
    }
    update(entityId: I, entity: E, authToken: A): Promise<E> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}`, 'PUT', entity, authToken);
    }
    deleteOne(entityId: I, entity: undefined, authToken: A): Promise<string> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/${entityId}`, 'DELETE', entity, authToken);
    }
 

}

