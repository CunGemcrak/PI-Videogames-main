const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
     sequelize.define('Genres', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: false,
      }
    }, { timestamps: false });
  };
  