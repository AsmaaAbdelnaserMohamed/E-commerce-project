import mongoose from "mongoose";

const schema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    cartItems: [
        {
            product: {
                type: mongoose.Types.ObjectId,
                ref: 'product'
            },
            price: Number,
            quantity: {
                type: Number,
                default: 1
            }
        }

    ],
    totalPrice: Number,
    totalPriceAfterDiscount: Number,
    discount: Number

}, { timestamps: true })


export const cartModel = mongoose.model('cart', schema)