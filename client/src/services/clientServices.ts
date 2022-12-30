import { Identifiable } from "../types/common/commonTypes";
import request from "../utils/request";

let baseUrl = 'http://localhost:3030'

export interface ApiClient<K, V extends Identifiable<K>> {
    register(entityWithoutId: Omit<V, 'id'>): Promise<V>;
    login(entity: V): Promise<V>;

    getAll(): Promise<V[]>;
    getOneById(id: K): Promise<V>;
    create(entityWithoutId: Omit<V, 'id'>): Promise<V>;
    update(entity: V): Promise<V>;
    deleteById(id: K): Promise<void>;
}

export class ApiClientImpl<K, V extends Identifiable<K>> implements ApiClient<K,V> {
    constructor(public apiCollectionSuffix: string) {}

    // User related
    register(entityWithoutId: Omit<V, "id">): Promise<V> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/register`, 'POST', entityWithoutId);
    }
    login(entity: V): Promise<V> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}/login`, 'POST', entity);
    }

    // Common
    getAll(): Promise<V[]> {
        return request(`${baseUrl}/${this.apiCollectionSuffix}`, 'GET');
    }

    // Entities related
    getOneById(id: K): Promise<V> {
        throw new Error("Method not implemented.");
    }
    create(entityWithoutId: Omit<V, "id">): Promise<V> {
        throw new Error("Method not implemented.");
    }
    update(entity: V): Promise<V> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: K): Promise<void> {
        throw new Error("Method not implemented.");
    }

}