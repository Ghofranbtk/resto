const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");
const Category = require("./category.model");

const Menu = sequelize.define(
  "Menu",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id",
      },
    },
    imageUrl: {
      type: DataTypes.STRING, // Stocke l'URL de l'image téléchargée
    },
  },
  {
    tableName: "menus",
    timestamps: false,
  }
);

Category.hasMany(Menu, { foreignKey: "categoryId" });
Menu.belongsTo(Category, { foreignKey: "categoryId" });

module.exports = Menu;
