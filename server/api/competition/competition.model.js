'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Competition', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag: DataTypes.STRING,
    type: DataTypes.STRING
  });
}
