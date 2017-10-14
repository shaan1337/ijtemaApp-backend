'use strict';

export default function(sequelize, DataTypes) {
  return sequelize.define('Registration', {
    _id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tag: DataTypes.STRING,
    comment: DataTypes.STRING,
    deleted: DataTypes.BOOLEAN,
    date: DataTypes.DATE
  });
}
