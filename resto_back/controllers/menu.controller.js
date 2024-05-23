const Menu = require("../models/menu.model");
const fs = require("fs");
const path = require("path");

//----------------- create menu
exports.create = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const menu = await Menu.create({ ...req.body, imageUrl: req.file.path });
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------- findAll menu
exports.findAll = async (req, res) => {
  try {
    const menus = await Menu.findAll();
    res.status(200).json(menus);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------- findOne menu
exports.findOne = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (menu) {
      res.status(200).json(menu);
    } else {
      res.status(404).json({ message: "Menu not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------- update menu
exports.update = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    if (req.file) {
      // Remove old image file if it exists
      if (menu.imageUrl) {
        fs.unlinkSync(path.resolve(menu.imageUrl));
      }
      req.body.imageUrl = req.file.path;
    }

    await Menu.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Menu updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//----------------- delete menu
exports.delete = async (req, res) => {
  try {
    const menu = await Menu.findByPk(req.params.id);
    if (!menu) {
      return res.status(404).json({ message: "Menu not found" });
    }

    // Remove image file if it exists
    if (menu.imageUrl) {
      fs.unlinkSync(path.resolve(menu.imageUrl));
    }

    await Menu.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Menu deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
