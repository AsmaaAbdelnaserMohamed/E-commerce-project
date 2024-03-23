import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short category name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    image: String,
  },
  { timestamps: true }
);
schema.post("init", function (doc) {
  doc.image = process.env.BASE_URL + "uploads/" + doc.image;
});
export const categoryModel = mongoose.model("category", schema);
