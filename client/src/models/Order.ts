import { Identifiable, IdType } from "../types/common/commonTypes";

const enum OrderStatus {
    Pending = 1, InProgress, Dispatched, Completed, CanceledByClient, CanceledByManagement
}

export class Order implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public clientId: IdType,
        public productId: IdType,
        public status: OrderStatus = OrderStatus.Pending,
        public createdAd: Date,
        public comments: string[]
    ){}
}

export class OrderCreateDTO implements Omit<Order, '_id' | 'createdAd' | 'comments'>{
    constructor(
        public clientId: IdType,
        public productId: IdType,
        public status: OrderStatus = OrderStatus.Pending
    ){
    }
}