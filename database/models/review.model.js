import mongoose from "mongoose";

const schema = new mongoose.Schema({

    text: {
        type: String,
        required: true,
        minLength: [2, 'too short review title'],
        maxLength: [1000, 'too long review title']
    },
    rate: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'category'
    },
    product: {
        type: mongoose.Types.ObjectId,
        ref: 'product'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    }
}, { timestamps: true })

schema.pre(/^find/,function(){
    this.populate('createdBy','name -_id')
})
export const reviewModel = mongoose.model('review', schema)



