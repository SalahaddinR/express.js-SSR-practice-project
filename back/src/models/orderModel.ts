import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',
        required: true
    },
    deliveryWay: {
        type: String, 
        required: true
    },
    deliveryAddress: {
        type: String,
        required: false
    },
    deliveryStatus: {
        type: String,
        require: false
    },
    totalFee: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

const OrderModel = mongoose.model('Order', orderSchema);
export default OrderModel;
