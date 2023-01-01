import { Identifiable, IdType } from "../types/common/commonTypes"

export const enum UserRole {
    Customer = 1, Hairdresser, Operator, Admin
}
export class User implements Identifiable<IdType> {
    constructor(
        public _id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: number,
        public gender: "male" | "female",
        public password: string,
        public role: UserRole = UserRole.Customer,
        public imgUrl?: string
    ){}
}

export class UserRegisterDTO implements Omit<User, '_id' | 'imgUrl'> {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: number,
        public gender: "male" | "female",
        public password: string,
        public role: UserRole = UserRole.Customer
    ){}
}
export class AuthUserRegisterDTO implements Omit<User, '_id'> {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: number,
        public gender: "male" | "female",
        public password: string,
        public role: number,
        public imgUrl: string,
    ){}
}

export class UserLoginDTO implements Omit<User, '_id' | 'firstName' | 'lastName' | 'phone' | 'gender' | 'role'> {
    constructor(
        public email: string,
        public password: string,
    ){}
}