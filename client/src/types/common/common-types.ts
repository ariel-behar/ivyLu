export type AuthTokenType = string;

export type IdType = string;

export interface Identifiable<K> {
    _id: K;
}

export type Partial<T> = {
    [K in keyof T]?: T[K]
}

export type Optional<T> = T | undefined;