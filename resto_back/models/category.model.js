const { DataTypes } = require("sequelize");
const sequelize = require("../config/db.config");

const Category = sequelize.define(
  "Category",
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
    imageUrl: {
      type: DataTypes.STRING, // Stocke l'URL de l'image téléchargée
    },
  },
  {
    tableName: "categories",
    timestamps: false,
  }
);

module.exports = Category;
