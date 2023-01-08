import { Product } from "../models/Product";
import { User } from "../models/User";
import { IdType } from "./common/commonTypes";

export interface OrderConfirmationResponseInterface {
        _id: IdType,
        client: User,
        product: Product,
        createdAt: string,
        status: number
}