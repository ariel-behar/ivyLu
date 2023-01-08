import { Identifiable, IdType } from "../types/common/commonTypes";

const enum OrderStatus {
    Pending = 'Pending', InProgress='In Progress', Dispatched = 'Dispatched', Completed = 'Completed', CanceledByClient = 'Canceled by Client', CanceledByManagement = 'Canceled by Management'
}

export class Order implements Identifiable<IdType>{
    constructor(
        public _id: IdType,
        public clientId: IdType,
        public productId: IdType,
        public status: OrderStatus.Pending,
        public createdAd: Date,
        public comments: string[]
    ){}
}

export class OrderCreateDTO implements Omit<Order, '_id' | 'status' | 'createdAd' | 'comments'>{
    constructor(
        public clientId: IdType,
        public productId: IdType,
    ){}
}