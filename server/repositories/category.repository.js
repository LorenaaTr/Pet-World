const Category = require("../database/mongodb/models/categories.model");

exports.findByName = async (name) => {
  return await Category.findOne({ name });
};

exports.findById = async (id) => {
  return await Category.findById(id).populate("subcategories");
};
exports.findAll = async () => {
  return await Category.find();
};

exports.createCategory = async (name, type, imageCover, parentId) => {
  const newCategory = new Category({ name, type, imageCover, parentId });
  return await newCategory.save();
};

exports.addSubcategoryToParent = async (parentCategory, subcategoryId) => {
  parentCategory.subcategories.push(subcategoryId);
  return await parentCategory.save();
};
exports.save = async (category) => {
  await category.save();
};

exports.populateCategory = async (category) => {
  return await category.populate("parentId").execPopulate();
};

exports.deleteOne = async (id) => {
  await Category.deleteOne({ _id: id });
};
