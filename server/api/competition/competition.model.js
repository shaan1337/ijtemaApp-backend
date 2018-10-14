'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Competition', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag: {
      type: DataTypes.STRING,
      unique: true
    },
    type: DataTypes.STRING
  });
}
