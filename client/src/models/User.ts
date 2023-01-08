import { Identifiable, IdType } from "../types/common/commonTypes"

export const enum UserRole {
    Client = 1, Hairdresser, Operator, Admin
}
export class User implements Identifiable<IdType> {
    constructor(
        public _id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public gender: "male" | "female",
        public password: string,
        public role: UserRole = UserRole.Client,
        public authToken: string,
        public about?: string,
        public imgUrl?: string,
    ){}
}

export class UserRegisterDTO implements Omit<User, '_id' | 'imgUrl' | 'about' | 'authToken'> {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public gender: "male" | "female",
        public password: string,
        public role: UserRole = UserRole.Client
    ){}
}
export class AuthUserRegisterDTO implements Omit<User, '_id' | 'authToken'> {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public gender: "male" | "female",
        public password: string,
        public role: number,
        public about?: string,
        public imgUrl?: string,
    ){}
}

export class UserLoginDTO implements Omit<User, '_id' | 'firstName' | 'lastName' | 'phone' | 'gender' | 'role' | 'imgUrl' | 'about' | 'authToken'> {
    constructor(
        public email: string,
        public password: string,
    ){}
}