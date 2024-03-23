import mongoose from "mongoose";
import bcrypt from "bcrypt";

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short user name"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      unique: [true, "name is required"],
      trim: true,
      required: true,
      minLength: [2, "too short email"],
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
      required: true,
    },
    isBlocked: {
      type: Boolean,
      default: "false",
    },
    isActive: {
      type: Boolean,
      default: "true",
    },
    confirm: {
      type: Boolean,
      default: "false",
    },
    project: {
      type: Boolean,
      default: "false",
    },
    passwordChangedAt: Date,
    wishList: [{
      type: mongoose.Types.ObjectId,
      ref: 'product'
    }],
    addresses: [{
      street: String,
      phone: String,
      city: String
    }]
  },
  { timestamps: true }
);

schema.pre("save", function () {
  if (this.password) this.password = bcrypt.hashSync(this.password, 8);
});
schema.pre("findOneAndUpdate", function () {
  if (this._update.password) this._update.password = bcrypt.hashSync(this._update.password, 8);
});
export const userModel = mongoose.model("user", schema);
