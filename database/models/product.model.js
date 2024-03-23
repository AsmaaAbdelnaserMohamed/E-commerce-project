import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: [true, "title is required"],
      trim: true,
      required: true,
      minLength: [2, "too short product title"],
      maxLength: [200, "too long product title"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [2, "too short product title"],
      maxLength: [1000, "too long product title"],
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    priceAfterDiscount: {
      type: Number,
      min: 0,
      required: true,
    },
    rateCount: {
      type: Number,
      min: 0,
      required: true,
    },
    rateAvg: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    sold: Number,
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    imageCover: String,
    images: [],
    category: {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      ref: "subcategory",
    },
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "brand",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

schema.post("init", function (doc) {
  if (doc.images || doc.imageCover) {
    doc.imageCover = process.env.BASE_URL + "uploads/" + doc.imageCover;
    doc.images = doc.images?.map(
      (img) => process.env.BASE_URL + "uploads/" + img
    );
  }
});

schema.virtual('myReviews', {
  ref: 'review',
  localField: '_id',
  foreignField: 'product'
})

schema.pre('findOne', function () {
  this.populate('myReviews')
})
export const productModel = mongoose.model("product", schema);
