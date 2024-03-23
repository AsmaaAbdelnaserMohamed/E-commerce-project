import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    orderItems: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'product'
            },
            price: Number,
            quantity: Number 
        }
    ],
    shippingAddress: {
        street: String,
        city: String,
        phone: String
    },
    totalOrderPrice: Number,
    paymentType: {
        type: String,
        enum: ['cash', 'card'],
        default: 'cash'
    },
    paidAt: Date,
    isPaid: {
        type: Boolean,
        default: false
    },
    isDelivered: {
        type: Boolean,
        default: false
    },
    deliveredAt: Date
}, { timestamps: true })
export const orderModel = mongoose.model('order', schema)