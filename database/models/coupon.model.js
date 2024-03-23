import mongoose from "mongoose";

const schema = new mongoose.Schema({
    code: {
        type: String,
        unique: [true, 'code is required'],
        trim: true,
        required: true,
        minLength: [2, 'too short code']
    },
    discount: {
        type: Number,
        min: 0,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })


export const couponModel = mongoose.model('coupon', schema)



