export type AuthTokenType = string;

export type IdType = string;

export interface Identifiable<K> {
    _id?: K;
}
