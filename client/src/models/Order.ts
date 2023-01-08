import { Identifiable, IdType } from "../types/common/commonTypes";

const enum OrderStatus {
    Pending = 1, InProgress, Shipped, Completed, CanceledByClient, CanceledByManagement
}

export class Order implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public client: IdType,
        public product: IdType,
        public status: OrderStatus = OrderStatus.Pending,
        public createdAd: Date,
        public comments: string[]
    ){}
}

export class OrderCreateDTO implements Omit<Order, '_id' | 'createdAd' | 'comments'>{
    constructor(
        public client: IdType,
        public product: IdType,
        public status: OrderStatus = OrderStatus.Pending
    ){
    }
}