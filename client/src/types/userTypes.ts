import { UserRole } from "../models/User"
import { IdType } from "./common/commonTypes"

export interface UserInterface {
    role: UserRole,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    gender: "male" | "female",
    password: string,
}

export interface UserFromDBInterface{
    _id: IdType,
    role: UserRole,
    firstName: string,
    lastName: string,
    email: string,
    phone: number,
    gender: "male" | "female",
}
