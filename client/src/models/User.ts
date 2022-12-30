import { Identifiable, IdType } from "../types/common/commonTypes"

export const enum UserRole {
    Customer = 1, Operator, Admin
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
        public role: UserRole = UserRole.Customer
    ){}
}

export class UserCreateDTO implements Omit<User, '_id'> {
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

export class UserLoginDTO implements Omit<User, '_id' | 'firstName' | 'lastName' | 'phone' | 'gender' | 'role'> {
    constructor(
        public email: string,
        public password: string,
    ){}
}