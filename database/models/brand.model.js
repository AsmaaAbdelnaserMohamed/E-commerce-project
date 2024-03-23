import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short brand name"],
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
    logoImage: String,
  },
  { timestamps: true }
);
schema.post("init", function (doc) {
  doc.logoImage = process.env.BASE_URL + "uploads/" + doc.logoImage;
});

export const brandModel = mongoose.model("brand", schema);
