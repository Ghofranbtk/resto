const Category = require("../models/category.model");
const fs = require("fs");
const path = require("path");

//----------------- create category
exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const category = await Category.create({
      ...req.body,
      imageUrl: req.file.path,
    });
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------- findAll category
exports.findAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------- findOne category
exports.findOne = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------- update category
exports.update = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    if (req.file) {
      // Remove old image file if it exists
      if (category.imageUrl) {
        fs.unlinkSync(path.resolve(category.imageUrl));
      }
      req.body.imageUrl = req.file.path;
    }

    await Category.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------- delete category
exports.delete = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Remove image file if it exists
    if (category.imageUrl) {
      fs.unlinkSync(path.resolve(category.imageUrl));
    }

    await Category.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
