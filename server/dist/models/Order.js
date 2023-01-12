import mongoose from "mongoose";
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
        enum: [1, 2, 3, 4, 5, 6]
    },
}, {
    timestamps: true
});
const Order = mongoose.model('Order', orderSchema);
export default Order;
//# sourceMappingURL=Order.js.map