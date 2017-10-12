'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('News', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    author: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.STRING,
    date: DataTypes.DATE
  });
}
