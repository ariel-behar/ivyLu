
const enum UserRole {
    Customer = 1, Operator, Admin
}

export default class User {
    public status: UserRole = UserRole.Customer

    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: number,
        public gender: "male" | "female",
        public password: string,
    ){}
}