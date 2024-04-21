const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Brand must have a name"],
      unique: true,
      trim: true,
      maxLength: [
        30,
        "A Brand Name must have less or equal then 30 characters"
      ],
      minLength: [3, "A Brand Name must have more or equal then 2 characters"]
    },
    imageCover: {
      type: String
    },
    images: [String],
    founded: {
      type: Date,
      min: ["1750-01-01", "Date must be above 1750/01/01"],
      max: ["2022-12-31", "Date must be below 2022/12/31"]
    },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
    createdIn: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      select: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

brandSchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
    select: "-__v"
  });
  next();
});
const Brand = mongoose.model("Brand", brandSchema);

module.exports = Brand;
