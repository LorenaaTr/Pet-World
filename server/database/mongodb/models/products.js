const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product must have a name!"],
    unique: true,
    minlength: [
      5,
      "Product name must have equal or greater than 5 characters."
    ],
    maxlength: [180, "Product name must have equal or less than 40 characters."]
  },
  imageCover: {
    type: String
  },
  images: [String],
  stock: {
    type: Number,
    default: 0
  },
  price: Number,
  weight: {
    type: String
  },
  description: {
    type: String,
    required: [true, "Product must have a description!"]
  },
  nutrition: {
    type: String,
    minlength: [
      5,
      "Nutrition description must have equal or greater than 5 characters."
    ]
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Brand"
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});
productsSchema.pre(/^find/, function (next) {
  this.populate({
    path: "reviews",
    select: "-__v"
  });
  next();
});
const Products = mongoose.model("Products", productsSchema);

Products.find()
  .populate("brand")
  .then(products => {
    console.log(products); // Handle products here
  })
  .catch(err => {
    console.error(err); // Handle error here
  });

Products.find()
  .populate("category")
  .then(products => {
    console.log(products); // Handle products here
  })
  .catch(err => {
    console.error(err); // Handle error here
  });

module.exports = Products;
