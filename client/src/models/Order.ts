import { Identifiable, IdType } from "../types/common/common-types";
import { Product } from "./Product";
import { User } from "./User";

const enum OrderStatus {
    Pending = 1, InProgress, Shipped, Completed, CanceledByClient, CanceledByManagement
}

export class Order implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public client: User,
        public product: Product,
        public status: OrderStatus = OrderStatus.Pending,
        public createdAt: string,
    ){}
}

export class OrderCreateDTO implements Omit<Order, '_id' | 'client' | 'product' | 'createdAt' | 'comments' >{
    constructor(
        public clientId: IdType,
        public productId: IdType,
        public status: OrderStatus = OrderStatus.Pending, 
    ){
    }
}
