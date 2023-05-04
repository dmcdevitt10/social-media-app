const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Post: sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    contect: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
