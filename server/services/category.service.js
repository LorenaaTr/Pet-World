const categoryRepository = require("../repositories/category.repository");

exports.createCategory = async (name, type, imageCover, parentId) => {
  const existingCategory = await categoryRepository.findByName(name);

  if (existingCategory) {
    throw new Error("Category name must be unique");
  }

  let parentCategory = null;
  if (parentId) {
    parentCategory = await categoryRepository.findById(parentId);
    if (!parentCategory) {
      throw new Error("Parent category not found");
    }
  }

  const newCategory = await categoryRepository.createCategory(
    name,
    type,
    imageCover,
    parentId
  );

  if (parentCategory) {
    await categoryRepository.addSubcategoryToParent(
      parentCategory,
      newCategory._id
    );
  }

  return newCategory;
};
exports.getCategoryById = async (categoryId) => {
  const category = await categoryRepository.findById(categoryId);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};
exports.findAll = async () => {
  return await categoryRepository.findAll();
};

exports.updateCategory = async (id, data) => {
  const category = await this.getCategoryById(id);

  if (data.name && data.name !== category.name) {
    const existingCategory = await categoryRepository.findByName(data.name);
    if (existingCategory) {
      throw new Error("Category name must be unique");
    }
    category.name = data.name;
  }

  if (data.parentId) {
    const newParentCategory = await categoryRepository.findById(data.parentId);
    if (!newParentCategory) {
      throw new Error("Parent category not found");
    }
    category.parentId = data.parentId;
  }
  if (data.imageCover !== undefined && data.imageCover !== null) {
    const existingCategory = await categoryRepository.findByName(data.name);
    if (!existingCategory) {
      throw new Error("Category not found");
    }
    category.imageCover = data.imageCover;
  }
  if (data.type && data.type !== "Subcategory" && data.type !== "Category") {
    throw new Error("Invalid category type");
  }

  category.type = data.type;
  await categoryRepository.save(category);

  const populatedCategory = await categoryRepository.populateCategory(category);

  return populatedCategory;
};

exports.deleteCategory = async (id) => {
  const category = await this.getCategoryById(id);

  if (category.parentId) {
    const parentCategory = await categoryRepository.findById(category.parentId);
    if (parentCategory) {
      parentCategory.subcategories = parentCategory.subcategories.filter(
        (subcategoryId) => subcategoryId.toString() !== category._id.toString()
      );
      await categoryRepository.save(parentCategory);
    }
  }

  await categoryRepository.deleteOne(id);
};
