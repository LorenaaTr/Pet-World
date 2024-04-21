const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    enum: {
      values: ["Category", "Subcategory"],
      message: "Type is either: Category, Subcategory"
    }
  },

  imageCover: {
    type: String
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Animals" }],
  subcategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ]
});
CategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "products",
    select: "-__v"
  });
  next();
});

CategorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "animals",
    select: "-__v"
  });
  next();
});
const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
