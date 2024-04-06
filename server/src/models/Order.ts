import mongoose from "mongoose";
import { IdType } from "../types/common-types";
import { IClientDocument } from "./Client";
import { IProductDocument } from "./Product";

export interface IOrderCreate {
    client: IdType | IClientDocument,
    product: IdType | IProductDocument,
    status: 1 | 2 | 3 | 4 | 5 | 6,
}

export interface IOrderDocument {
    _id: IdType,
    client: IdType | IClientDocument,
    product: IdType | IProductDocument,
    status: 1 | 2 | 3 | 4 | 5 | 6,
    createdAt: NativeDate
}

const orderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    status: {
        type: Number,
        required: [true, 'Order status is required'],
        enum: [1,2,3,4,5,6]
    },
},{
    timestamps: true
})

const Order = mongoose.model<IOrderDocument>('Order', orderSchema)

export default Order;