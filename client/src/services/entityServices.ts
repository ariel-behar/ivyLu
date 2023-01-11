import { AuthTokenType, Identifiable } from "../types/common/common-types";
import request from "../utils/request";
import { baseUrl } from "./api";
export interface ApiEntity<I, E extends Identifiable<I>, A extends AuthTokenType> {
    getOne(entityId: I): Promise<E>;
    getAll(): Promise<E[]>;
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

